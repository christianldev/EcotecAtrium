<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $user = \App\Models\Admin::create([
            'username' => 'clopez',
            'email' => 'clopez@gmail.com',
            'password' => bcrypt('password'),
        ]);


        $role_admin = Role::create(['name' => 'admin']);
        $role_student = Role::create(['name' => 'student']);
        $role_teacher = Role::create(['name' => 'teacher']);

        $permissions  = Permission::pluck('id', 'id')->all();

        $role_admin->syncPermissions($permissions);
        $role_student->syncPermissions($permissions);
        $role_teacher->syncPermissions($permissions);

        $user->assignRole($role_admin);
    }
}
