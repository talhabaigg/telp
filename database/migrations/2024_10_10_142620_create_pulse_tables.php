<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Laravel\Pulse\Support\PulseMigration;

return new class extends PulseMigration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (! $this->shouldRun()) {

            return;
        }

        Schema::create("pulse_values", function (Blueprint $table) {

            $table->id();
            $table->unsignedInteger("timestamp");
            $table->string("type");
            $table->mediumText("key");
            match ($this->driver()) {

                "sqlite" => $table->string("key_hash"),
                "mariadb", "mysql" => $table->char("key_hash", 16)->charset("binary")->virtualAs("unhex(md5(`key`))"),
                "pgsql" => $table->uuid("key_hash")->storedAs("md5('key')::uuid"),
            };
            $table->mediumText("value");

            $table->index("timestamp");
            $table->index("type");
            $table->unique([ "type", "key_hash", ]);
        });

        Schema::create("pulse_entries", function (Blueprint $table) {

            $table->id();
            $table->unsignedInteger("timestamp");
            $table->string("type");
            $table->mediumText("key");
            match ($this->driver()) {

                "sqlite" => $table->string("key_hash"),
                "mariadb", "mysql" => $table->char("key_hash", 16)->charset("binary")->virtualAs("unhex(md5(`key`))"),
                "pgsql" => $table->uuid("key_hash")->storedAs("md5('key')::uuid"),
            };
            $table->bigInteger("value")->nullable();

            $table->index("timestamp");
            $table->index("type");
            $table->index("key_hash");
            $table->index([ "timestamp", "type", "key_hash", "value", ]);
        });

        Schema::create("pulse_aggregates", function (Blueprint $table) {

            $table->id();
            $table->unsignedInteger("bucket");
            $table->unsignedMediumInteger("period");
            $table->string("type");
            $table->mediumText("key");
            match ($this->driver()) {

                "sqlite" => $table->string("key_hash"),
                "mariadb", "mysql" => $table->char("key_hash", 16)->charset("binary")->virtualAs("unhex(md5(`key`))"),
                "pgsql" => $table->uuid("key_hash")->storedAs("md5('key')::uuid"),
            };
            $table->string("aggregate");
            $table->decimal("value", 20, 2);
            $table->unsignedInteger("count")->nullable();

            $table->unique([ "bucket", "period", "type", "aggregate", "key_hash", ]);
            $table->index([ "period", "bucket", ]);
            $table->index("type");
            $table->index([ "period", "type", "aggregate", "bucket", ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("pulse_values");
        Schema::dropIfExists("pulse_entries");
        Schema::dropIfExists("pulse_aggregates");
    }
};
