"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingStatus = void 0;
var BookingStatus;
(function (BookingStatus) {
    BookingStatus[BookingStatus["CANCEL"] = -1] = "CANCEL";
    BookingStatus[BookingStatus["PENDING"] = 0] = "PENDING";
    BookingStatus[BookingStatus["CONFIRMED"] = 1] = "CONFIRMED";
    BookingStatus[BookingStatus["COMPLETED"] = 2] = "COMPLETED";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
//# sourceMappingURL=constants.js.map