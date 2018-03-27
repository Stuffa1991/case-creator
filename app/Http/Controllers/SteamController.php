<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Invisnik\LaravelSteamAuth\SteamAuth;

/**
 * @property Controller controller
 */
class SteamController extends Controller
{
    /**
     * @var SteamAuth
     */
    private $steam;

    public function __construct(SteamAuth $steam)
    {
        $this->steam = $steam;
        $this->controller = new Controller;
    }

    public function login()
    {
        if ($this->steam->validate()) {
            $info = $this->steam->getUserInfo();

            if (!is_null($info)) {
                $user = (new User)->where('steamid64', $info->get('steamID64'))->first();

                if (is_null($user)) {
                    $username = $info->get('personaname');

                    $user = (new User)->create([
                        'username' => $username,
                        'avatar' => $info->get('avatarfull'),
                        'steamid64' => $info->get('steamID64')
                    ]);
                } else {
                    $username = $info->get('personaname');
                    $user->update(['username' => $username, 'avatar' => $info->get('avatarfull')]);
                }

                Auth::login($user);
                return redirect('/'); // redirect to site
            }
        } else {
            return $this->steam->redirect(); // redirect to Steam login page
        }
    }

    public function logout()
    {
        //Make their session invalid
        Auth::logout();
        return redirect('/');
    }

    public function updateSettings(Request $request)
    {
        $user = $this->controller->getUserInfo();
        if ($token = $this->_parseTradeLink($link = $request->get('trade_link'))) {
            $user->trade_link = $link;
            $user->accessToken = $token;
            $user->save();
            return response()->json(['msg' => 'Settings have been saved!', 'status' => 'success', 'trade_link' => $link]);
        } else {
            return response()->json(['msg' => 'Invalid URL!', 'status' => 'error']);
        }
    }

    private function _parseTradeLink($tradeLink)
    {
        $query_str = parse_url($tradeLink, PHP_URL_QUERY);
        parse_str($query_str, $query_params);
        return isset($query_params['token']) ? $query_params['token'] : false;
    }
}
