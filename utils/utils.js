const formatMoney = (num) => {
  return num?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

const handleChangeColorStatus = (statusID, statusName) => {
  switch (statusID) {
    case "CREATED":
      return (
        <span
          className="text-sm leading-5 font-medium px-3 py-[5px] rounded-md  text-white"
          style={{ backgroundColor: "#34F0D1" }}
        >
          {statusName}
        </span>
      );
    case "COMPLETED_DELIVERED":
    case "COMPLETED":
      return (
        <span
          className="text-sm leading-5 font-medium px-3 py-[5px] rounded-md  "
          style={{ backgroundColor: "#edf7ed", color: "#2e7d32" }}
        >
          {statusName}
        </span>
      );
    case "WAIT_DELIVERY":
    case "PROCESSING_DELIVERY":
    case "READY_TO_SHIP":
      return (
        <span
          className="text-sm leading-5 font-medium px-1 py-[5px] rounded-md  "
          style={{ backgroundColor: "#FEF0CD", color: "#B08620" }}
        >
          {statusName}
        </span>
      );
    case "CANCELED":
      return (
        <span
          className="text-sm leading-5 font-medium px-3 py-[5px] rounded-md  "
          style={{ backgroundColor: "#f8d7da", color: "#58151c" }}
        >
          {statusName}
        </span>
      );
    case "WAIT_ORDER":
    case "WAIT_APPROVAL_SELL":
      return (
        <span className="text-sm leading-5 font-medium px-3 py-[5px] rounded-md   text-white bg-bgPrimary">
          {statusName}
        </span>
      );
    case "APPROVAL":
      return (
        <span className="text-sm leading-5 font-medium px-3 py-[5px] rounded-md   text-[#2e7d32] bg-[#edf7ed]">
          {statusName}
        </span>
      );
    case "REQUESTED":
      return (
        <span
          className="text-sm leading-5 font-medium px-3 py-[5px] rounded-md   text-white "
          style={{ backgroundColor: "#66ccff" }}
        >
          {statusName}
        </span>
      );
    case "DRAFT_ORDER":
      return (
        <span
          className="text-sm leading-5 font-medium px-3 py-[5px] rounded-md   text-black"
          style={{ backgroundColor: "#ccc" }}
        >
          {statusName}
        </span>
      );
    default:
      break;
  }
};

const handleChangeColorStatusPayment = (statusID, value) => {

  switch (statusID) {
    case "PARTIAL":
      return (
        <span
          className="text-sm leading-5 font-medium px-3 py-[5px] rounded-md "
          style={{
            backgroundColor: "#f4f1a9",
            fontSize: "12px",
            color: "#999d36",
          }}
        >
          {/* Thanh toán một phần */}
          {value ? value : "Thanh toán một phần"}
        </span>
      );
    case "WAIT_FOR_PAY":
      return (
        <span
          className="text-sm leading-5 font-medium px-3 py-[5px] rounded-md "
          style={{
            backgroundColor: "#FF5722",
            fontSize: "12px",
            color: "#fff",
          }}
        >
          {/* Thanh toán một phần */}
          {value ? value : "Thanh toán dự kiến  "}
        </span>
      );

    case "COMPLETED_DELIVERED":
    case "COMPLETED":
      return (
        <span
          className="text-sm leading-5 font-medium px-3 py-[5px] rounded-md  min-w-4"
          style={{ backgroundColor: "#edf7ed", color: "#2e7d32" }}
        >
          {/* Đã thanh toán đủ */}
          {value ? value : "Đã thanh toán đủ"}
        </span>
      );
    // case "PARTIAL":
    // case "PROCESSING_DELIVERY":
    // case "READY_TO_SHIP":
    //   return (
    //     <span
    //       className="text-sm leading-5 font-medium px-3 py-[5px] rounded-md   text-white"
    //       style={{ backgroundColor: "#EBE226" }}
    //     >
    //       {statusName}
    //     </span>
    //   );
    case "CREATE":
      return (
        <span
          className="text-sm leading-5 font-medium px-3 py-[5px] rounded-md "
          style={{ backgroundColor: "#ced4d3", color: "#495057" }}
        >
          {/* Chưa thanh toán */}
          {value ? value : "Chưa thanh toán"}
        </span>
      );
    case "WAIT_ORDER":
    case "WAIT_APPROVAL_SELL":
      return (
        <span
          className="text-sm leading-5 font-medium px-3 py-[5px] rounded-md"
          style={{ backgroundColor: "#cfe2ff", color: "#052c65" }}
        ></span>
      );
    case "DRAFT_ORDER":
      return (
        <span
          className="text-sm leading-5 font-medium px-3 py-[5px] rounded-md"
          style={{ backgroundColor: "#ced4da", color: "#495057" }}
        >
          {statusName}
        </span>
      );
    default:
      break;
  }
};
const handleChangeColorStatusText = (statusID, statusName) => {
  switch (statusID) {
    case "CREATED":
      return (
        <span className="text-sm leading-5 font-medium px-3 py-[5px] rounded-md  text-[#34F0D1] ">
          {statusName}
        </span>
      );
    case "COMPLETED_DELIVERED":
    case "COMPLETED":
      return (
        <span className="text-sm leading-5 font-medium px-3 py-[5px] rounded-md   text-green-500">
          {statusName}
        </span>
      );
    case "WAIT_DELIVERY":
    case "PROCESSING_DELIVERY":
    case "READY_TO_SHIP":
      return (
        <span className="text-sm leading-5 font-medium px-3 py-[5px] rounded-md ">
          {statusName}
        </span>
      );
    case "CANCELED":
      return (
        <span
          className="text-sm leading-5 font-medium px-3 py-[5px] rounded-md  "
          style={{ backgroundColor: "#f8d7da", color: "#58151c" }}
        >
          {statusName}
        </span>
      );
    case "WAIT_ORDER":
    case "WAIT_APPROVAL_SELL":
      return (
        <span className="text-sm leading-5 font-medium px-3 py-[5px] rounded-md   text-bgPrimary">
          {statusName}
        </span>
      );
    case "DRAFT_ORDER":
      return (
        <span className="text-sm leading-5 font-medium px-3 py-[5px] rounded-md   text-[#ccc]">
          {statusName}
        </span>
      );
    default:
      break;
  }
};

const UUIDNumber = () => {
  return parseInt(Date.now() + (Math.random() * 100000).toFixed());
};
let hostName =
  typeof window !== "undefined" &&
  window.location.protocol + "//" + window.location.host;
export {
  formatMoney,
  handleChangeColorStatus,
  handleChangeColorStatusText,
  UUIDNumber,
  hostName,
  handleChangeColorStatusPayment,
};
