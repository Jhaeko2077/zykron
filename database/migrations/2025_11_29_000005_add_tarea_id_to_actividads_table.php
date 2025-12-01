<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('actividads', function (Blueprint $table) {
            $table->unsignedBigInteger('tarea_id')->nullable()->after('user_id');
            $table->foreign('tarea_id')->references('id')->on('tareas')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('actividads', function (Blueprint $table) {
            $table->dropForeign(['tarea_id']);
            $table->dropColumn('tarea_id');
        });
    }
};