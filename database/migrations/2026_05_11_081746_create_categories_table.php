<?php

use App\Enums\CategoryType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            // Convert enum objects to their string values
            $table->enum('type', array_column(CategoryType::cases(), 'value'));
            $table->string('title', 255);
            $table->string('short_description', 255)->nullable();
            $table->boolean('status')->default(0);
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();

            $table->index('type');
            $table->index('status');
            $table->index('order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
