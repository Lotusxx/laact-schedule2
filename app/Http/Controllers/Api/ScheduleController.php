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

    //スケジュールの登録処理
    public function create(Request $request){
        $schedules = new Schedule_detail;
        $schedules->sch_date = $request->sch_date;
        $schedules->sch_time = $request->sch_time;
        $schedules->sch_category = $request->sch_category;
        $schedules->sch_contents = $request->sch_contents;
        $schedules->sch_title = $request->sch_title;
        $schedules->save();
        return response()->json($schedules);
    }
}
