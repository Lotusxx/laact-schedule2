<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Schedule_detail;

class ScheduleController extends Controller
{
    public function scheduleindex(){
        $schedules = Schedule_detail::all();
        return response()->json($schedules);
    }
}
