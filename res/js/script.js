// USE jQuery !!!

// Write everything in here
$(function () {
    var user = new User("Jane", "Doe", "20/04/1969", "Mathematics");
    var courses = [
        new Course("OOP", 2, 89),
        new Course("Databases", 2, 95),
        new Course("Discrete mathematics", 1, 62),
        new Course("Programming", 1, 92),
    ];
    // Calling the function to dynamically populate HTML on web page loading
    init();

    // Pressing the profile button, shows the profile and hides the courses
    var profileButton = $("#profile-button");
    profileButton.click(function (event) {
        $("#courses-container").removeClass("active");
        $("#courses-button").removeClass("active");
        $(event.target).addClass("active");
        $("#profile-container").addClass("active");
    });

    // Pressing the courses button, shows the courses and hides the profile
    var coursesButton = $("#courses-button");
    coursesButton.click(function (event) {
        $("#profile-container").removeClass("active");
        $("#profile-button").removeClass("active");
        $(event.target).addClass("active");
        $("#courses-container").addClass("active");
    });

    
    var addCourseButton = $("#add-course-button");
    var addForm = $("#add-course");
    var cancelButton = $("#cancel-course");
    var saveButton = $("#save-course");
    //Pressing the "+" button shows or hides the form to add new course
    addCourseButton.click(function(){
        addForm.toggle();
        //Pressing the grey cancel button will hide the form
        //and information will disappear
        cancelButton.click(function(){
            $('#title').val('');
            $('#semester').val('');
            $('#grade').val('');
            addForm.hide();
        });

        //When clicking "Save" button, in the form, entered information should appear in the table and
        //the GPA on "Profile" container needs to be updated as well (depending on the grade you enter)
        //the form also needs to be reset (all the entered information cleared out) and hidden
        saveButton.click(function(){
            let title = $("#title").val();
            let semester = $("#semester").val();
            let grade = $("#grade").val();
            $('#title').val('');
            $('#semester').val('');
            $('#grade').val('');

            courses.push(new Course(title, semester, grade));

            let table_row = $("<tr></tr>");
            let course_id = $("<td></td>");
            let course_name = $("<td></td>");
            let course_semester = $("<td></td>");
            let course_grade = $("<td></td>");
            course_id.text(courses.length);
            course_name.text(title);
            course_semester.text(semester);
            course_grade.text(grade);
            table_row.append(course_id);
            table_row.append(course_name);
            table_row.append(course_semester);
            table_row.append(course_grade);
            $("#courses tbody").append(table_row);

            $('#gpa strong').text(calculateGPA());

            $(this).off('click');
            addForm.hide();
        })
    });

    function calculateGPA(){
        let sum = 0;
        for (let i = 0; i < courses.length; i++) {
            let point = 0;
            if(courses[i].grade > 90){
                point = 4;
            }
            else if(courses[i].grade > 80){
                point = 3
            }
            else if(courses[i].grade > 70){
                point = 2
            }
            else if(courses[i].grade > 60){
                point = 1
            }
            else if(courses[i].grade > 50){
                point = 0.5
            }
            else if(courses[i].grade <= 50){
                continue;
            }
            sum = sum + point;
        }

        return (Math.round(((sum)/courses.length) * 100)/100).toFixed(2);
    }

    // Dynamically populate html using objects created on web page loading
    function init() {

        // Replacing previous user info with the new generated info
        $("#name").text(user.firstname + " " + user.lastname);
        $("#birthdate").text(user.birthdate);
        $("#faculty").text(user.faculty);

        // Emptying previous courses
        $("#courses tbody").empty();
        // Adding every course as a row in the courses table
        for (let i = 0; i < courses.length; i++) {

            let table_row = $("<tr></tr>");
            let course_id = $("<td></td>");
            let course_name = $("<td></td>");
            let course_semester = $("<td></td>");
            let course_grade = $("<td></td>");

            course_id.text(i+1);
            course_name.text(courses[i].title);
            course_semester.text(courses[i].semester);
            course_grade.text(courses[i].grade);

            table_row.append(course_id);
            table_row.append(course_name);
            table_row.append(course_semester);
            table_row.append(course_grade);

            $("#courses tbody").append(table_row);
        }
    }
});