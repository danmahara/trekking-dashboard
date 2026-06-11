<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait ModelQueryTrait
{
        /**
     * @method static Builder active()
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', '=', '1');
    }

    /**
     * @method static Builder ordered()
     */
    public function scopeOrdered(Builder $query, $dir = 'asc'): Builder
    {
        return $query->orderBy('order', $dir);
    }
}
