import { forwardRef, Fragment, Ref, useEffect, useImperativeHandle, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";
import classNames from "@/utils/shared/ClassesUtils";

export interface RefErrorModal {
  show: (title?: string, description?: string) => void;
}

interface Props {
  className?: string;
  onClosed?: () => void;
}

const ErrorModal = ({ className, onClosed }: Props, ref: Ref<RefErrorModal>) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [closeText, setCloseText] = useState<string>();

  useEffect(() => {
    setTitle(t("shared.error").toString());
    setCloseText(t("shared.close"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function show(_title?, _description?) {
    if (_title) {
      setTitle(_title);
    }
    if (_description) {
      setDescription(_description);
    } else if (_title) {
      setTitle(t("shared.error").toString());
      setDescription(_title);
    }
    setOpen(true);
  }

  useImperativeHandle(ref, () => ({ show }));

  function close() {
    setOpen(false);
    if (onClosed) {
      onClosed();
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className={classNames(className, "fixed z-50 inset-0 overflow-y-auto")} onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-800 text-white font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-0 text-sm"
                  onClick={close}
                >
                  {closeText}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default forwardRef(ErrorModal);
