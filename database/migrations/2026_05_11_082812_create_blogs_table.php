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

            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();

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

            $table->unique('slug');
            $table->index('publish_date');
            $table->index('status');
            $table->index('is_featured');
            $table->index('order');
            $table->index(['status', 'publish_date']); // composite — for public blog listing queries
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
