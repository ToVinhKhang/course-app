$(document).ready(() => {
    $("#addLearningSchedule").click(() => {
        $("#addLearningScheduleModal").modal("toggle");
    });

    $("#addLearningScheduleButton").click((event) => {
        event.preventDefault();
        fetch("/learningschedule", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                courseId: $("#learningScheduleCourseId").val(),
                room: $("#learningScheduleRoom").val(),
                date: $("#learningScheduleDate").val(),
                time: $("#learningScheduleTime").val(),
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                // Success result
                if (result.code === 1) {
                    $("#addLearningScheduleFailed").text("");
                    $("#addLearningScheduleSuccess").text(result.message);

                    setTimeout(() => {
                        $("#learningScheduleCourseId").val("");
                        $("#learningScheduleRoom").val("");
                        $("#learningScheduleDate").val("");
                        $("#learningScheduleTime").val("");
                        $("#addLearningScheduleModal").modal("hide");
                        $("#addLearningScheduleSuccess").text("");

                        $("#learningScheduleList").append(`
                            <tr id=${result.data.learningScheduleId}>
                                <td>${result.data.courseName}</td>
                                <td>${result.data.room}</td>
                                <td>${result.data.date}</td>
                                <td>${result.data.time}</td>
                                <td>${result.data.teacherName}</td>
                                <td class="d-flex">
                                    <button type="button" class="btn btn-outline-primary editLearningSchedule" data-learningScheduleId=${result.data.learningScheduleId}>Cập nhật</button>
                                    <button type="button" class="ml-2 btn btn-outline-danger deleteLearningSchedule" data-learningScheduleId=${result.data.learningScheduleId}>Xóa</button>
                                </td>
                            </tr>
                        `);
                    }, 1000);
                }

                // Failed result
                else if (result.code === 0) {
                    $("#addLearningScheduleSuccess").text("");
                    $("#addLearningScheduleFailed").text(result.message);
                }
            })
            .catch((error) => console.log(error));
    });
});
