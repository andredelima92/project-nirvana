<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TravelController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/travels', [TravelController::class, 'index']);
Route::post('/travels', [TravelController::class, 'store']);
Route::put('/travels/{id}', [TravelController::class, 'update']);
Route::delete('/travels/{id}', [TravelController::class, 'destroy']);
Route::get('/travels/{id}', [TravelController::class, 'show']);
