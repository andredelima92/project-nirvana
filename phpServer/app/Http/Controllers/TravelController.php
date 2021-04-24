<?php

namespace App\Http\Controllers;

use App\Models\Travel;
use Illuminate\Http\Request;

class TravelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $travels = Travel::orderBy($request->_orderBy, 'desc')->offset($request->_offset)->limit($request->_limit)->get();
        return response()->json($travels);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $travel = Travel::create($request->all());

        return response()->json($travel);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $travel = Travel::find($id);

        return response()->json($travel);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $travel = Travel::find($id);
        $travel->name  = $request->name;
        $travel->uf = $request->uf;
        $travel->city = $request->city;
        $travel->reference = $request->reference;
        $travel->description = $request->description;
        $travel->save();

        return response()->json($travel);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Travel::destroy($id);

        return response()->json([], 204);
    }
}
