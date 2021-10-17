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
        \DB::table('schedule_details')->insert([
            [
                'sch_date' => '2021-10-6',
                'sch_time' => '15:35',
                'sch_category' => 'テスト',
                'sch_title' => 'テストタイトル３３３３３３３３３３',
                'sch_contents' => 'テスト勉強',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'sch_date' => '2021-10-6',
                'sch_time' => '15:35',
                'sch_category' => 'テスト',
                'sch_title' => 'テストタイトル４',
                'sch_contents' => 'テスト勉強',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'sch_date' => '2021-10-6',
                'sch_time' => '15:35',
                'sch_category' => 'テスト',
                'sch_title' => 'テストタイトル５',
                'sch_contents' => 'テスト勉強',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
        ]);
    }
}
