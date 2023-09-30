import { BsFillTrash3Fill } from "react-icons/bs";
import React from "react";

const DeleteConcertModal = ({ handleDelete }) => {

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#deleteEventModal"
      >
        <div className="d-flex align-items-center">
          <BsFillTrash3Fill></BsFillTrash3Fill>
        </div>
      </button>

      <div
        className="modal fade"
        id="deleteEventModal"
        aria-labelledby="deleteEventModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg bg-light">
            <div className="modal-header">
              <div className="modal-title text-danger" id="deleteEventModal">
                Are you sure you want to delete the event?
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
              </button>
            </div>
            <div className="modal-body">
              <button
                className="btn btn-danger"
                onClick={handleDelete}
                data-bs-dismiss="modal"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConcertModal;
