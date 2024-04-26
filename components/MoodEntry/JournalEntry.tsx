// components/JournalEntry.tsx
import React, { useState } from "react";
import { MoodProps } from "../../pages/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

type Props = {
  selectedMood: MoodProps;
  onJournalEntryChange: (entry: string) => void;
  textBefore: string;
  textAfter: string;
};

const JournalEntry: React.FC<Props> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [journalEntry, setJournalEntry] = useState("");
  const [savedEntry, setSavedEntry] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
    setJournalEntry(savedEntry);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setJournalEntry(savedEntry);
  };

  const saveJournalEntry = () => {
    setIsModalOpen(false);
    setSavedEntry(journalEntry);
    props.onJournalEntryChange(journalEntry);
  };

  const handleJournalEntryChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setJournalEntry(e.target.value);
  };

  return (
    <div>
      <button className="btn btn-link" onClick={openModal}>
        <FontAwesomeIcon icon={faPenToSquare} />
        {savedEntry ? props.textAfter : props.textBefore}
      </button>
      {isModalOpen && (
        <dialog id="journal_entry_modal" className="modal" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              {savedEntry ? props.textAfter : props.textBefore}
            </h3>
            <textarea
              className="textarea textarea-bordered w-full mt-4"
              value={journalEntry}
              onChange={handleJournalEntryChange}
              rows={4}
            ></textarea>
            <div className="modal-action">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={closeModal}
              >
                ✕
              </button>
              <button className="btn" onClick={saveJournalEntry}>
                Save
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default JournalEntry;
