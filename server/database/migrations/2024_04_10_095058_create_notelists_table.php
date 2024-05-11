<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notelists', function (Blueprint $table) {
            $table->id(); //automatisch erstellt, Primary Key
            $table->string('title'); //List-Titel
            $table->string('description')->nullable(); //Optionale Beschreibung der Liste
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notelists');
    }
};
