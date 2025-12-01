<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
    
class Tarea extends Model
{
    protected $fillable = [
        'proyecto_id',
        'assigned_to',
        'title',
        'details',
        'status',
        'due_date',
    ];

    public function proyecto()
    {
        return $this->belongsTo(Proyecto::class);
    }

    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

}
