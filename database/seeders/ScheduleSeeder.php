<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('schedule_detail')->insert([
            [
                'sch_date' => '2021-10-6',
                'sch_time' => '15:35',
                'sch_category' => '勉強',
                'sch_title' => '勉強タイトル',
                'sch_contents' => 'テスト勉強',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'sch_date' => '2021-10-13',
                'sch_time' => '18:15',
                'sch_category' => '案件',
                'sch_title' => '案件タイトル',
                'sch_contents' => 'テスト案件',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'sch_date' => '2021-10-18',
                'sch_time' => '12:50',
                'sch_category' => '塾',
                'sch_title' => '塾タイトル',
                'sch_contents' => '塾予定テスト',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
        ]);
    }
}
