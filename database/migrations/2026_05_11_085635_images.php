<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->string('alt', 255);
            $table->text('file_name');
            $table->string('slug', 255);
            $table->string('imageable_type', 50);
            $table->unsignedInteger('imageable_id');
            $table->enum('type', ['cover', 'feature', 'meta', 'gallery', 'doc', 'icon']);
            $table->text('link')->nullable();
            $table->string('category', 50)->nullable();
            $table->text('short_description')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->boolean('status')->default(1);
            $table->timestamps();

            // Indexes for polymorphic relation
            $table->index(['imageable_type', 'imageable_id'], 'idx_imageable');
            $table->index(['imageable_type', 'imageable_id', 'type'], 'idx_imageable_type');
            $table->index('status', 'idx_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('images');

    }
};
