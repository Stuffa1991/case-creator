<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Price;
use App\Cases;
use App\Caseimages;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class CaseController extends Controller
{

	/**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->houseEdge = env('HOUSE_EDGE');
    }

   	/**
   	 * Return all items eligible for creating a case
   	 *
   	 * @return     <json>  ( all items )
   	 */
    public function items(Request $request) {
      //Check incoming message is ok
      if(strtolower($request->order) !== 'desc' && strtolower($request->order) !== 'asc' || strtolower($request->orderBy) !== 'price' && strtolower($request->orderBy) !=='name') return $this->apiReturnMessage('error','You cant do that');

      //Order by
      $orderBy = strtolower($request->orderBy) == 'price' ? 'price' : 'market_name';

      //Are the person searching for name?
      $requestHasName = $request->has('name');

      //Initial cache name
      $itemcache = 'order_' . $request->order . '_orderBy_' . $orderBy;

      //Cachename if request has a name
      $itemsearch = $requestHasName ? $itemcache . '_' . $request->name : $itemcache;

      //Check if search is cached
      if(Cache::has($itemsearch)) return Cache::get($itemsearch);

      //Find items eligible
      $query = $requestHasName ? Price::normal()->searchName($request->name) : Price::normal();
      $query = $query->orderBy($orderBy, $request->order)->paginate('15');

      //Cache result for 10 minutes
      Cache::put($itemsearch, $query, 10);

      return $query;
    }

    /**
     * { Get all images for cases }
     *
     * @return     <type>  ( Returns all available image )
     */
    public function images() {
      //Cache name
      $caseimages = 'caseimages';

      //Do cache already have it, return cached result
      if(Cache::has($caseimages)) return Cache::get($caseimages);

      $images = Caseimages::get();

      //Cache images for 10 minutes
      Cache::put($caseimages, $images, 10);

      return $images;
    }

   	/**
   	 * Return all cases
   	 *
   	 * @return     <json>  ( All cases created )
   	 */
    public function cases() {
      //TODO POPULAR/FEATURED Cases instead

      //Cache name
      $caseall = 'caseall';

      //Do cache already have it, return cached result
      if(Cache::has($caseall)) return Cache::get($caseall);

      $cases = Cases::with('items.iteminfo', 'image')->get();
      $cases = $cases ?: [];

      foreach ($cases as $case) {
        $case->totalPrice = $this->calculateTotalPrice($case->items,$case->id);
      }

      //Cache cases for 10 minutes
      Cache::put($caseall, $cases, 10);

      return $cases;
    }

    /**
     * Returns a specific case
     *
     * @return <json> ( Returns specific case )
     */
    public function case($id) {
      //TODO Caching layer

      $casefind = 'casefind_' . $id;

      if(Cache::has($casefind)) return Cache::get($casefind);

      //Find the case
      $case = Cases::with('items.iteminfo')->findOrFail($id);

      //Return specific case
      $case->totalPrice = $this->calculateTotalPrice($case->items,$case->id);

      //Cache case for 10 minutes
      Cache::put($casefind, $case, 10);

      return $case;
    }

    /**
     * { Verify each item }
     *
     * @param      <type>   $items     The items
     * @param      integer  $verified  The verified
     *
     * @return     boolean  ( returns true of false )
     */
    private function verifyItems($items, $verified = 0) {
      $combinedPercentage = 0;
      //Count amount of items
      $count = count($items);
      for($i = 0; $i < $count; $i++) {
        $item = $items[$i];

        //We find that item and verify it exist
        $found = Price::findOrFail($item['id']);

        //If we found the item it means that it exist
        $verified += $found ? 1 : 0;

        $combinedPercentage += (int)$item['odds'];
      }

      //We return an array filled with all the id's if every single one was verified
      return ($verified == $count && $combinedPercentage == 100);
    }

    /**
     * Creates items.
     *
     * @param      <type>  $items    The items
     * @param      <type>  $newCase  The new case
     */
    private function createItems($items,$newCase) {
      foreach($items as $item) {
        $newCase->items()->create([
          'priceid' => $item['id'],
          'percentage' => $item['odds']
        ]);
      }
    }

    /**
     * Creates a case.
     *
     * @param      \Illuminate\Http\Request  $request  The request
     *
     * @return     <type>                    ( returns the id of the created case )
     */
    public function createCase(Request $request) {
      //Get the case params
      $caseParams = $request->case;

      //Get authed user
      $user = Auth::user();

      //Find if the image they try to use exist
      $image = Caseimages::findOrFail($caseParams['imageid'])->id;

      //Verify that the items they try to use exist and that they are combined 100 percentage
      if(!$this->verifyItems($caseParams['items'])) return $this->apiReturnMessage('error','Something went wrong');

      //Create the case
      $newCase = $user->cases()->create([
        'name' => $caseParams['casename'],
        'caseimageid' => $image
      ]);

      //TODO - Look at savemany
      //Create the items with relationship in the case
      $this->createItems($caseParams['items'],$newCase);

      return $this->apiReturnMessage('success',$newCase->id);
    }

        /**
     * Calculates the total price.
     *
     * @param      <type>   $items  The items
     * @param      integer  $price  The start price
     *
     * @return     <type>   The total price.
     */
    private function calculateTotalPrice($items,$caseid,$price = 0) {
      $case = 'caseprice_' . $caseid;

      //If the case total price is already in the cache return that
      if(Cache::has($case)) return Cache::get($case);

      foreach($items as $item) {
        //We calculate how much x percentage of that items price would cost
        $price += $item->iteminfo->price/100*$item->percentage;
      }

      //Calculated total price + houseedge - set in .env
      $total = $price * $this->houseEdge;

      //Cache price for 10 minutes
      Cache::put($case, $total, 10);

      return $total;
    }

    /**
     * Returns a winning.
     *
     * @param      <type>   $items         The items
     * @param      integer  $randomNumber  The random number
     * @param      integer  $start         The start
     *
     * @return     <type>   ( description_of_the_return_value )
     */
    private function returnWinning($items,$randomNumber,$start = 0, $index = 1) {
      foreach ($items as $item) {
        //We add this items percentage to the starting
        $percentage = $item->percentage + $start;

        //Checking if the random number and percentage is in the same range else we check the next item
        if($randomNumber <= $percentage) {
          return response()->json(['percentage' => $randomNumber, 'item' => $item, 'id' => $item->id, 'index' => $index]);
        } else {
          //We add this items percentage to the start so we know what percentage we are checking
          $start += $item->percentage;
        }
        $index++;
      }
    }

    /**
     * [openCase description]
     * @param  [type] $id [Id of case opened]
     * @return [json]     [Error  || Success - Item opened + balance]
     */
    public function openCase($id) {
		//Find the user
		$user = Auth::user();

		$caseOpenedBy = 'caseopen_' . $id . '_user'. $user->id;

		//If the case total price is already in the cache return that
		if(Cache::has($caseOpenedBy)) return $this->apiReturnMessage('error', 'This command can only be used every 10 second');

		//Find the case
		$case = Cases::with('items.iteminfo')->findOrFail($id);

		//Total price of the case
		$totalPrice = $this->calculateTotalPrice($case->items,$case->id);

		//Check user balance
		if($user->balance < $totalPrice) return $this->apiReturnMessage('error','Insufficient balance');

		//Find a random number we need it to be 0.0000 - 100.0000
		$randomNumber = random_int(0,1000000)/10000;

		//Get the item
		$item = $this->returnWinning($case->items,$randomNumber);

		//Deduct balance
		$user->decrement('balance', $totalPrice);

		//Associate the user with the item
		$user->hasItems()->attach($item->getData()->id);

		//Create a new transaction
		$user->transactions()->create([
		'action' => 'buy',
		'amount' => $totalPrice
		]);

		//Increment case opened
		$case->increment('opened');

		//Give back accurate balance
		$data = $item->getData();
		$data->balance = $user->balance;

		//Cache the opened case for 5 seconds to avoid being spammed
		Cache::put($caseOpenedBy, '', 1/12);
		return $this->apiReturnMessage('success',$data);
    }

    /**
     * { Function to act as a api return message }
     *
     * @param      <string>  $code     Error/Success code
     * @param      <string>  $message  Message wanted to be shown
     *
     * @return     <json>  ( Returns a json with a message )
     */
    private function apiReturnMessage($code,$message,$user = null)
    {
        return response()->json(['status' => $code, 'message' => $message]);
    }
}
