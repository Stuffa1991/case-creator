<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function myaccount()
    {
        return Auth::user()->with('hasItems.iteminfo', 'transactions')->first();
    }

    public function sellItem($id)
    {

    }

    public function withdrawItem()
    {

    }
}
