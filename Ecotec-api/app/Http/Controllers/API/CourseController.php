<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use App\Traits\SchoolSession;
use App\Interfaces\CourseInterface;
use App\Http\Requests\CourseStoreRequest;
use App\Interfaces\SchoolClassInterface;
use App\Repositories\PromotionRepository;
use App\Repositories\SchoolSessionRepository;

class CourseController extends Controller
{
    use SchoolSession;
    protected $schoolCourseRepository;
    protected $schoolSessionRepository;

    /**
    * Create a new Controller instance
    * 
    * @param CourseInterface $schoolCourseRepository
    * @return void
    */
    public function __construct(SchoolSessionRepository $schoolSessionRepository, CourseInterface $schoolCourseRepository) {
        $this->schoolSessionRepository = $schoolSessionRepository;
        $this->schoolCourseRepository = $schoolCourseRepository;
        $this->middleware('permission:course-list|course-create|course-edit|course-delete', ['only' => ['getStudentCourses']]);
        $this->middleware('permission:course-create', ['only' => ['store']]);
        $this->middleware('permission:course-edit', ['only' => ['update']]);
        $this->middleware('permission:course-delete', ['only' => ['destroy']]);
   
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  CourseStoreRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(CourseStoreRequest $request)
    {
        try {
            $this->schoolCourseRepository->create($request);

            return response()->json(['success' => 'Curso creado correctamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al crear curso. '.$e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getStudentCourses($student_id) {
        $current_school_session_id = $this->getSchoolCurrentSession();
        echo $current_school_session_id;
        $promotionRepository = new PromotionRepository();
        $class_info = $promotionRepository->getPromotionInfoById($current_school_session_id, $student_id);
        
        if ($class_info) {
            $courses = $this->schoolCourseRepository->getByClassId($class_info->class_id);
            $data = [
                'class_info'    => $class_info,
                'courses'       => $courses,
            ];
            
            return $data;
            
        }
        
        return response()->json(['error' => 'No se encontró ningún curso'], 404);

       
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  $course_id
     * @return \Illuminate\Http\Response
     */
    public function edit($course_id)
    {
        $current_school_session_id = $this->getSchoolCurrentSession();

        $course = $this->schoolCourseRepository->findById($course_id);

        $data = [
            'current_school_session_id' => $current_school_session_id,
            'course'                    => $course,
            'course_id'                 => $course_id,
        ];

        return view('courses.edit', $data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $course_id)
    {
        try {
            $this->schoolCourseRepository->update($request, $course_id);

            return response()->json(['success' => 'Curso actualizado correctamente'], 200);
        } catch ( \Exception $e) {
            return response()->json(['error' => 'Error al actualizar curso'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function destroy(Course $course)
    {
        //
    }
}