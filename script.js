$(function () {
  // Display date at the top of page
  function displayDate() {
    let currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDate);
  }

  // Make boxes for schedule
  function timeBlocks() {
    let currentTime = dayjs().hour();

    // Loops through hours
    for (let hour = 9; hour <= 17; hour++) {
      let modifiedHours;
      if (hour <= 12) {
        modifiedHours = hour + "AM";
      } else {
        modifiedHours = hour - 12 + "PM"; // fixes hours to display afternoon correctly
      }

      //Time block elements
      let $timeBlock = $("<div>").addClass("row time-block");
      let $hourDiv = $("<div>")
        .addClass("col-2 col-md-1 hour text-center py-3")
        .text(modifiedHours);
      let $inputArea = $("<textarea>")
        .addClass("col-8 col-md-10 description")
        .attr("rows", 3);
      let $saveBtn = $("<button>")
        .addClass("btn saveBtn col-2 col-md-1")
        .attr("aria-label", "save")
        .html('<i class="fas fa-save" aria-hidden="true"></i>');

      $timeBlock
        .attr("id", "hour-" + hour)
        .append($hourDiv, $inputArea, $saveBtn);
      $(".container-fluid").append($timeBlock);

      // Add classes to color boxes based on time
      if (hour < currentTime) {
        $timeBlock.addClass("past");
      } else if (hour === currentTime) {
        $timeBlock.addClass("present");
      } else {
        $timeBlock.addClass("future");
      }
    }
  }
  
  // Save button functionality
  $(".container-fluid").on("click", ".saveBtn", function () {
    let eventId = $(this).closest(".time-block").attr("id");
    let eventDescription = $(this).siblings(".description").val();
    localStorage.setItem(eventId, eventDescription);
  });

  // Get saved schedule info
  function getEvents() {
    $(".time-block").each(function () {
      let eventId = $(this).attr("id");
      let savedEvent = localStorage.getItem(eventId);

      if (savedEvent) {
        $(this).find(".description").val(savedEvent);
      }
    });
  }

  // Functions...ASSEMBLE! 🛡️🏹
  displayDate();
  timeBlocks();
  getEvents();
});
