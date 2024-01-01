<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::all();
        return response()->json($employees); 
    } 
    


    public function store(Request $request)
    {   
        $employees=new Employee([
            'username' =>$request->input('username'),
            'password' =>$request->input('password'),
        ]);
        $employees->save();
        return response()->json('Employee created');
    }


    public function show($id)
    {
      $contact=Employee::find($id);
      return response()->json('$contact');
    }

    public function update(Request $request,$id)
    {
        $employees=Employee::find($id);
        $employees->update($request->all());
        return response()->json('Employee update');
    }


    public function delete($id)
    {
        $employees=Employee::find($id);
        $employees->delete();
        return response()->json('delete');
    }
}
