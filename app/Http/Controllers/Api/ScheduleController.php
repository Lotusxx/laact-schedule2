<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Schedule_detail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ScheduleController extends Controller
{
    public function scheduleindex(Request $request){
        Log::info('取得ユーザーID：'.$request->user_id);
        $schedules = Schedule_detail::where('user_id',$request->user_id)->get();
        return response()->json($schedules);
    }

    //スケジュールの登録処理
    public function create(Request $request){
        $schedules = new Schedule_detail;
        Log::info('更新ユーザーID：'.$request->user_id);
        $schedules->sch_date = $request->sch_date;
        $schedules->sch_time = $request->sch_time;
        $schedules->sch_category = $request->sch_category;
        $schedules->sch_contents = $request->sch_contents;
        $schedules->sch_title = $request->sch_title;
        $schedules->user_id = $request->user_id;
        $schedules->save();
        return response()->json($schedules);
    }

    //編集画面への遷移
    public function edit(Request $request){
        $schedules = Schedule_detail::find($request->id);
        return $schedules;
    }

    //データ更新アクション
    public function update(Request $request){
        $schedules = Schedule_detail::find($request->id);
        $schedules->sch_date = $request->sch_date;
        $schedules->sch_time = $request->sch_time;
        $schedules->sch_category = $request->sch_category;
        $schedules->sch_contents = $request->sch_contents;
        $schedules->sch_title = $request->sch_title;
        $schedules->save();
        return $schedules;
    }

    //データ削除アクション
    public function delete(Request $request){
        $schedule = Schedule_detail::find($request->id);
        $schedule->delete();
        $schedules = Schedule_detail::all();
        return $schedules;
    }
}
