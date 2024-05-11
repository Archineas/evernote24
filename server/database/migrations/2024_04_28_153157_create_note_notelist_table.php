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
        Schema::create('note_notelist', function (Blueprint $table) {
            $table->foreignId('note_id')->constrained()->onDelete('cascade');
            $table->foreignId('notelist_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            $table->primary(['note_id', 'notelist_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('note_notelist');
    }
};
