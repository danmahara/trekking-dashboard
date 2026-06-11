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
        Schema::create('blogs', function (Blueprint $table) {
            $table->id(); // bigint unsigned, auto_increment

            $table->unsignedInteger('category_id')->nullable();

            $table->string('slug', 100);
            $table->string('title', 100);
            $table->longText('description');

            $table->string('short_title', 255)->nullable();
            $table->string('author', 100)->nullable();
            $table->string('author_post', 50)->nullable();
            $table->string('country', 50)->nullable();
            $table->text('quote')->nullable();

            $table->date('publish_date');

            $table->unsignedInteger('view')->default(0);
            $table->unsignedInteger('order')->default(0);

            $table->boolean('status')->default(0);
            $table->boolean('is_featured')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
