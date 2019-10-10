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
        $("#profile-container").addClass("active");
    });

    // Pressing the courses button, shows the courses and hides the profile
    var coursesButton = $("#courses-button");
    coursesButton.click(function (event) {
        $("#profile-container").removeClass("active");
        $("#courses-container").addClass("active");
    });


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