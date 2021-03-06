<?php

namespace App\Http\Controllers;

use App\Price;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;

/**
 * @property mixed $steamlyticsApiKey
 * @property Client client
 */
class SteamLyticsController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->steamlyticsApiKey = env('STEAMLYTICS_API_KEY');
        $this->client = new Client(['base_uri' => 'http://api.csgo.steamlytics.xyz']);
    }

    /**
     * All popular items
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function itemsPopular()
    {
        return $this->apiClient('/v1/items/popular', 'itemsPopular', 1);
    }

    /**
     * Function to act as a api Client
     *
     * @param $url
     * @param $name
     * @param $time
     * @return \Illuminate\Http\JsonResponse
     */
    private function apiClient($url, $name, $time)
    {
        if (Cache::has($name)) return $this->apiReturnMessage('success', Cache::get($name));
        //Make new instance of guzzle
        $res = $this->client->get($url . '?key=' . $this->steamlyticsApiKey);

        //Get status code
        if ($res->getStatusCode() != '200') return $this->apiReturnMessage('error', 'Wrong status code ' . $res->getStatusCode());

        //Get content type
        if ($res->getHeaderLine('content-type') != 'application/json') return $this->apiReturnMessage('error', 'Wrong format returned');

        $body = json_decode($res->getBody());
        //Get success message
        if ($body->success != true) return $this->apiReturnMessage('error', 'Error from steamlytics');

        //Put request in cache
        Cache::put($name, $body, $time);

        return $this->apiReturnMessage('success', $body);
    }

    /**
     * Function to act as a api return message
     *
     * @param $code
     * @param $message
     * @return \Illuminate\Http\JsonResponse
     */
    private function apiReturnMessage($code, $message)
    {
        return response()->json(['status' => $code, 'message' => $message]);
    }

    /**
     * Return a singular items price
     *
     * @param $name
     * @return \Illuminate\Http\JsonResponse
     */
    public function price($name)
    {
        return $this->apiClient('/v1/prices/' . $name, 'price_' . $name, 1);
    }

    /**
     * Price list compact
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function priceListCompact()
    {
        return $this->apiClient('/v2/pricelist/compact', 'priceListCompact', 10);
    }

    /**
     * This is a command you run to update items in your DB + prices
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function populate()
    {
        //Fetch all prices - make them into an array so they can accessed
        $prices = (array)$this->priceList()->getData()->message->items;

        //Fetch all items
        $items = $this->items()->getData()->message->items;

        //Count all the items - arrays starts at 0 so we extract one
        $itemsCount = count($items) - 1;

        //For each on every instance of an item
        for ($i = 0; $i < $itemsCount; $i++) {

            //We access the current looped item
            $item = $items[$i];

            $doWeWantThis = $this->filterGarbage($item->market_hash_name);

            $item->type = $this->getType($item->quality_color);

            //If not we make sure the thing we are trying to make also exists in the pricing array
            if (array_key_exists($item->market_hash_name, $prices) && $item->type && $doWeWantThis) {
                //Update or create an item
                (new Price)->updateOrCreate(['market_hash_name' => $item->market_hash_name], [
                    'market_name' => $item->market_name,
                    'market_hash_name' => $item->market_hash_name,
                    'type' => $item->type,
                    'imageurl' => $item->icon_url,
                    'name_color' => $item->name_color,
                    'quality_color' => $item->quality_color,
                    'price' => $prices[$item->market_hash_name]->safe_price
                ]);
            }

            //If this was the last instance of the object, this means the loop has run succesfully
            if ($i == $itemsCount) return $this->apiReturnMessage('success', 'Everything went as planned');
        }

        return $this->apiReturnMessage('error', 'Something went wrong not every item was added');
    }

    /**
     * Price list
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function priceList()
    {
        return $this->apiClient('/v2/pricelist', 'priceList', 10);
    }

    /**
     * All current items
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function items()
    {
        return $this->apiClient('/v1/items/', 'items', 1);
    }

    /**
     * @param $itemName
     * @return bool
     */
    private function filterGarbage($itemName)
    {
        $itemName = strtolower($itemName);

        if (preg_match('/case key/iu', $itemName)) {
            return false;
        } else if (preg_match('/case hardened/iu', $itemName)) {
            return true;
        } else if (preg_match('/esports/iu', $itemName)) {
            return false;
        } else if (preg_match('/capsule/iu', $itemName)) {
            return false;
        } else if (preg_match('/souvenir/iu', $itemName)) {
            return false;
        } else if (preg_match('/sticker/iu', $itemName)) {
            return false;
        } else if (preg_match('/capsule/iu', $itemName)) {
            return false;
        } else if (preg_match('/katowice/iu', $itemName)) {
            return false;
        } else if (preg_match('/dreamhack/iu', $itemName)) {
            return false;
        } else if (preg_match('/challengers/iu', $itemName)) {
            return false;
        } else if (preg_match('/legends/iu', $itemName)) {
            return false;
        } else if (preg_match('/pass/iu', $itemName)) {
            return false;
        } else if (preg_match('/pin/iu', $itemName)) {
            return false;
        } else if (preg_match('/bravo/iu', $itemName)) {
            return false;
        } else if (preg_match('/present/iu', $itemName)) {
            return false;
        } else if (preg_match('/parcel/iu', $itemName)) {
            return false;
        } else if (preg_match('/package/iu', $itemName)) {
            return false;
        } else if (preg_match('/gift/iu', $itemName)) {
            return false;
        } else if (preg_match('/swap/iu', $itemName)) {
            return false;
        } else if (preg_match('/box/iu', $itemName)) {
            return false;
        } else if (preg_match('/weapon/iu', $itemName)) {
            return false;
        } else if (preg_match('/case/iu', $itemName)) {
            return false;
        } else if (preg_match('/graffiti/iu', $itemName)) {
            return false;
        } else if (preg_match('/name/iu', $itemName)) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Gets the type of a weapon
     *
     * @param $itemQuality
     * @return string
     */
    private function getType($itemQuality)
    {
        //Filter all the garbo
        switch ($itemQuality) {
            case 'EB4B4B':
                $itemQuality = 'Covert';
                break;
            case 'E4AE39':
                $itemQuality = 'Contraband';
                break;
            case 'D32CE6':
                $itemQuality = 'Classified';
                break;
            case 'B0C3D9':
                $itemQuality = 'Consumer Grade';
                break;
            case '8847FF':
                $itemQuality = 'Restricted';
                break;
            case '5E98D9':
                $itemQuality = 'Industrial Grade';
                break;
            case '5E98D9':
                $itemQuality = 'Mil-Spec';
                break;
            default:
                $itemQuality = false;
        }

        return $itemQuality;
    }

    /**
     * Update prices of every existing item in the db
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function updatePrices()
    {
        //Fetch all prices
        $prices = (array)$this->priceList()->getData()->message->items;

        //Fetch all items in db
        $items = (new Price)->get();

        //Count all items in the collection - arrays starts at 0 so we extract one
        $itemsCount = count($items) - 1;

        //For each on every instance of an item
        for ($i = 0; $i <= $itemsCount; $i++) {
            $item = $items[$i];

            $item->price = $prices[$item->market_hash_name]->safe_price;
            $item->save();

            //If this was the last instance of the object, this means the loop has run succesfully
            if ($i == $itemsCount) return $this->apiReturnMessage('success', 'Everything went as planned ' . $itemsCount . ' had their pricing updated');
        }

        return $this->apiReturnMessage('error', 'Something went wrong not every item was not updated');
    }
}
