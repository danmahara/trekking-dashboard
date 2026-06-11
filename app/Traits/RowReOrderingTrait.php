<?php

namespace App\Traits;

trait RowReOrderingTrait
{
    public function reOrder($rows): void
    {
        foreach ($rows as $row) {
            $row->timestamps = false; // To disable update_at field during update
            $id = $row->id;

            foreach (request()->order as $order) {
                if ($order['id'] == $id) {
                    $row->update(['order' => $order['position']]);
                }
            }
        }
    }

}
