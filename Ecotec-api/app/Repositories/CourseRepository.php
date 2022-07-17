<?php

namespace App\Repositories;

use App\Models\Course;
use App\Models\Semester;
use App\Interfaces\CourseInterface;

class CourseRepository implements CourseInterface
{
    public function create($request)
    {

        $validateCourse = $request->validate([
            'course_name' => 'required|string|max:255',
            'course_type' => 'required|string|max:255',
            'class_id' => 'required|integer|exists:school_classes,id',
            'semester_id' => 'required|integer|exists:semesters,id',
            'session_id' => 'required|integer|exists:school_sessions,id',
        ]);


        try {
            Course::create($validateCourse);
        } catch (\Exception $e) {
            throw new \Exception('Failed to create School Course. ' . $e->getMessage());
        }
    }

    public function getAll($session_id)
    {
        return Course::where('session_id', $session_id)->get();
    }

    public function getByClassId($class_id)
    {
        $course = Course::where('class_id', $class_id)->get();

        if ($course) {
            return $course;
        } else {
            return response()->json(['error' => 'No se encontró ningún curso'], 404);
        }
    }

    public function findById($course_id)
    {
        return Course::find($course_id);
    }

    public function update($request, $course_id)
    {

        try {
            $course = Course::find($course_id);
            $course->course_name = $request->course_name;
            $course->course_name = $request->course_name;
            $course->course_type = $request->course_type;
            $course->class_id = $request->class_id;
            $course->semester_id = $request->semester_id;
            $course->session_id = $request->session_id;
            $course->save();
        } catch (\Exception $e) {
            throw new \Exception('Error al crear el curso. ' . $e->getMessage());
        }
    }
}