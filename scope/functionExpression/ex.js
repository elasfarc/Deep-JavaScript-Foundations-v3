function printRecords(recordIds) {
  recordIds
    .map(idToRecord)
    .sort(sortNameAsc)
    .map(formatRecord)
    .forEach(printRecord);

  //* *************** */

  function sortNameAsc(a, b) {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  }
  function formatRecord(record) {
    const { name: studentName, id, paid } = record;
    return `${studentName} (${id}) : ${paid ? "Paid" : "Not Paid"}`;
  }
  function printRecord(record) {
    console.log(record);
  }
}

// ********************************
function idToRecord(id) {
  return studentRecords.find(function findRecordById(record) {
    return record.id == id;
  });
}
function recordToId(record) {
  return record.id;
}
// ********************************

var currentEnrollment = [410, 105, 664, 375];

var studentRecords = [
  { id: 313, name: "Frank", paid: true },
  { id: 410, name: "Suzy", paid: true },
  { id: 709, name: "Brian", paid: false },
  { id: 105, name: "Henry", paid: false },
  { id: 502, name: "Mary", paid: true },
  { id: 664, name: "Bob", paid: false },
  { id: 250, name: "Peter", paid: true },
  { id: 375, name: "Sarah", paid: true },
  { id: 867, name: "Greg", paid: false },
];

printRecords(currentEnrollment);
console.log("----");
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log("----");
remindUnpaid(currentEnrollment);

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/
