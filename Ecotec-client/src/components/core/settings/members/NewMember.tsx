import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Transition } from "@headlessui/react";
import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { WorkspaceDto } from "@/application/dtos/core/workspaces/WorkspaceDto";
import { TenantUserRole } from "@/application/enums/core/tenants/TenantUserRole";
import ErrorModal, { RefErrorModal } from "@/components/ui/modals/ErrorModal";
import SuccessModal, { RefSuccessModal } from "@/components/ui/modals/SuccessModal";
import tinyEventBus from "@/plugins/tinyEventBus";
import services from "@/services";
import { RootState } from "@/store";
import { useEscapeKeypress } from "@/utils/shared/KeypressUtils";
import SelectWorkspaces, { RefSelectWorkspaces } from "../../workspaces/SelectWorkspaces";
import { useSelector } from "react-redux";
import WarningBanner from "@/components/ui/banners/WarningBanner";
import Loading from "@/components/ui/loaders/Loading";
import classNames from "@/utils/shared/ClassesUtils";

interface Props {
  maxSize?: string;
}

export default function NewMember({ maxSize = "sm:max-w-lg" }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const errorModal = useRef<RefErrorModal>(null);
  const successModal = useRef<RefSuccessModal>(null);
  const selectWorkspaces = useRef<RefSelectWorkspaces>(null);
  const inputEmail = useRef<HTMLInputElement>(null);

  const [showing, setShowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone] = useState("");
  const [role, setRole] = useState<TenantUserRole>(TenantUserRole.MEMBER);
  const roleOptions = [
    {
      value: 0,
      name: t("settings.profile.roles.OWNER"),
      description: t("settings.profile.permissions.OWNER"),
    },
    {
      value: 1,
      name: t("settings.profile.roles.ADMIN"),
      description: t("settings.profile.permissions.ADMIN"),
    },
    {
      value: 2,
      name: t("settings.profile.roles.MEMBER"),
      description: t("settings.profile.permissions.MEMBER"),
    },
    {
      value: 3,
      name: t("settings.profile.roles.GUEST"),
      description: t("settings.profile.permissions.GUEST"),
    },
  ];
  const [workspaces, setWorkspaces] = useState<WorkspaceDto[]>([]);

  useEffect(() => {
    setShowing(true);
    // nextTick(() => {
    if (inputEmail.current) {
      inputEmail.current?.focus();
      inputEmail.current?.select();
    }
    // });
  }, []);
  function close() {
    navigate("/app/settings/members");
  }
  function save(e: FormEvent) {
    e.preventDefault();
    if (workspaces.length === 0) {
      errorModal.current?.show(t("shared.error"), t("account.tenant.members.errors.atLeastOneWorkspace"));
      return;
    }
    setLoading(true);
    services.tenantUserInvitations
      .inviteUser({
        email,
        firstName,
        lastName,
        phone,
        role,
        workspaces,
      })
      .then((response) => {
        tinyEventBus().emitter.emit("user-added", response);
        successModal.current?.show(
          t("app.tenants.members.invitationSent"),
          t("app.tenants.members.invitationDescription", [email, t("settings.profile.roles." + TenantUserRole[role])])
        );
      })
      .catch((error) => {
        errorModal.current?.show(t("shared.error"), t(error));
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function selectUserWorkspaces() {
    selectWorkspaces.current?.show([]);
  }
  function selectedWorkspaces(items: WorkspaceDto[]) {
    setWorkspaces(items);
  }
  function changedRole(e) {
    const _role: TenantUserRole = Number(e.target.value);
    setRole(_role);
  }
  const currentWorkspacesDescription = (workspaces: WorkspaceDto[]) => {
    if (workspaces.length === 0) {
      return t("app.workspaces.seletAtLeastOne");
    }
    return workspaces.map((f) => f.name).join(", ");
  };
  const maxUsers = useSelector((state: RootState): number => {
    return state.app.features.maxUsers;
  });
  const maxUsersReached = useSelector((state: RootState) => {
    return maxUsers > 0 && state.tenant.members.length >= maxUsers;
  });

  useEscapeKeypress(close);
  return (
    <div>
      <div>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition
              as={Fragment}
              show={showing}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
              </div>
            </Transition>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"></span>
            <Transition
              as={Fragment}
              show={showing}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                className={classNames(
                  "inline-block align-bottom bg-white rounded-sm px-4 pt-5 pb-4 text-left overflow-visible shadow-xl transform transition-all my-8 sm:align-middle w-full sm:p-6",
                  maxSize
                )}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="just absolute top-0 right-0 -mt-4 pr-4">
                  <button
                    onClick={close}
                    type="button"
                    className="p-1 bg-white hover:bg-gray-200 border border-gray-200 rounded-full text-gray-600 justify-center flex items-center hover:text-gray-500 focus:outline-none"
                  >
                    <span className="sr-only">{t("shared.close")}</span>
                    <svg
                      className="h-5 w-5 text-gray-700"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="mt-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-medium">{t("settings.members.actions.new")}</h4>
                  </div>
                  {maxUsersReached && (
                    <div>
                      <WarningBanner
                        redirect="/app/settings/subscription"
                        title={t("app.subscription.errors.limitReached")}
                        text={t("app.subscription.errors.limitReachedUsers", [maxUsers])}
                      />
                    </div>
                  )}
                  {(() => {
                    if (loading) {
                      return <Loading />;
                    } else {
                      return (
                        <form onSubmit={save} className="space-y-4">
                          <div className="grid grid-cols-2 gap-2">
                            {/*Email */}
                            <div className="col-span-2">
                              <label htmlFor="email" className="block text-xs font-medium text-gray-700 truncate">
                                {t("models.user.email")}
                              </label>
                              <div className="mt-1 flex rounded-md shadow-sm w-full">
                                <input
                                  type="email"
                                  ref={inputEmail}
                                  name="email"
                                  id="email"
                                  autoComplete="off"
                                  required
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  disabled={loading}
                                  className={classNames(
                                    "w-full flex-1 focus:ring-theme-500 focus:border-theme-500 block min-w-0 rounded-md sm:text-sm border-gray-300",
                                    loading && "bg-gray-100 cursor-not-allowed"
                                  )}
                                />
                              </div>
                            </div>
                            {/*Email: End */}

                            {/*User First Name */}
                            <div>
                              <label htmlFor="first-name" className="block text-xs font-medium text-gray-700 truncate">
                                {t("models.user.firstName")}
                              </label>
                              <div className="mt-1 flex rounded-md shadow-sm w-full">
                                <input
                                  type="text"
                                  id="first-name"
                                  name="first-name"
                                  autoComplete="off"
                                  required
                                  value={firstName}
                                  onChange={(e) => setFirstName(e.target.value)}
                                  className={classNames(
                                    "w-full flex-1 focus:ring-theme-500 focus:border-theme-500 block min-w-0 rounded-md sm:text-sm border-gray-300",
                                    loading && "bg-gray-100 cursor-not-allowed"
                                  )}
                                />
                              </div>
                            </div>
                            {/*User First Name: End */}

                            {/*User Last Name */}
                            <div>
                              <label htmlFor="last-name" className="block text-xs font-medium text-gray-700 truncate">
                                {t("models.user.lastName")}
                              </label>
                              <div className="mt-1 flex rounded-md shadow-sm w-full">
                                <input
                                  type="text"
                                  id="last-name"
                                  name="last-name"
                                  autoComplete="off"
                                  required
                                  value={lastName}
                                  onChange={(e) => setLastName(e.target.value)}
                                  className={classNames(
                                    "w-full flex-1 focus:ring-theme-500 focus:border-theme-500 block min-w-0 rounded-md sm:text-sm border-gray-300",
                                    loading && "bg-gray-100 cursor-not-allowed"
                                  )}
                                />
                              </div>
                            </div>
                            {/*User Last Name: End */}

                            {/*User Role */}
                            <div className="col-span-2">
                              <label htmlFor="last-name" className="block text-xs font-medium text-gray-700 truncate">
                                {t("models.user.role")}
                              </label>
                              <div className="mt-1 rounded-md shadow-sm w-full">
                                <fieldset>
                                  <legend className="sr-only">{t("models.user.role")}</legend>
                                  <div className="bg-white rounded-md -space-y-px">
                                    {roleOptions.map((option, idxRole) => {
                                      return (
                                        <label
                                          key={idxRole}
                                          className={classNames(
                                            "relative border py-2 px-4 flex cursor-pointer focus:outline-none",
                                            role === option.value && "bg-theme-50 border-theme-200 z-10",
                                            role !== option.value && "border-gray-200",
                                            idxRole === 0 && "rounded-tl-md rounded-tr-md",
                                            idxRole === roleOptions.length - 1 && "rounded-bl-md rounded-br-md"
                                          )}
                                        >
                                          <input
                                            type="radio"
                                            name="tenant-user-role"
                                            className="h-4 w-4 mt-3 cursor-pointer text-theme-600 border-gray-300 focus:ring-theme-500"
                                            aria-labelledby="tenant-user-role-0-label"
                                            aria-describedby="tenant-user-role-0-description"
                                            value={option.value}
                                            checked={role === option.value}
                                            onChange={changedRole}
                                          />
                                          <div className="ml-3 flex flex-col">
                                            <span
                                              id="tenant-user-role-0-label"
                                              className={classNames(
                                                "block text-sm font-medium",
                                                role === option.value && "text-theme-900",
                                                role !== option.value && "text-gray-900"
                                              )}
                                            >
                                              {option.name}
                                            </span>

                                            <span
                                              id="tenant-user-role-0-description"
                                              className={classNames(
                                                "block text-sm",
                                                role === option.value && "text-theme-700",
                                                role !== option.value && "text-gray-500"
                                              )}
                                            >
                                              {option.description}
                                            </span>
                                          </div>
                                        </label>
                                      );
                                    })}
                                  </div>
                                </fieldset>
                              </div>
                            </div>
                            {/*User Role: End */}

                            {/*User Workspaces */}
                            <div className="col-span-2">
                              <label htmlFor="description" className="block text-xs font-medium text-gray-700 truncate">
                                {t("models.workspace.plural")}
                              </label>
                              <div className="mt-2 rounded-md w-full space-y-2">
                                <input
                                  type="text"
                                  id="description"
                                  autoComplete="off"
                                  disabled
                                  value={currentWorkspacesDescription(workspaces)}
                                  className="bg-gray-100 cursor-not-allowed w-full flex-1 focus:ring-theme-500 focus:border-theme-500 block min-w-0 rounded-md sm:text-sm border-gray-300"
                                />
                                <button type="button" onClick={selectUserWorkspaces} className="flex items-center space-x-1 text-xs text-theme-600">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                  </svg>
                                  <span className="uppercase font-medium">{t("app.workspaces.actions.selectUserWorkspaces")}</span>
                                </button>
                              </div>
                            </div>
                            {/*User Workspaces: End */}
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="text-theme-700 text-sm">{loading && <div>{t("shared.loading")}...</div>}</div>

                            <div className="flex items-center space-x-2">
                              <button
                                disabled={loading}
                                className={classNames(
                                  "inline-flex items-center px-3 py-2 border space-x-2 border-gray-300 shadow-sm sm:text-sm font-medium sm:rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-500",
                                  loading && "bg-gray-100 cursor-not-allowed"
                                )}
                                type="button"
                                onClick={close}
                              >
                                <div>{t("shared.cancel")}</div>
                              </button>
                              <button
                                disabled={loading}
                                className={classNames(
                                  "inline-flex items-center px-3 py-2 border space-x-2 border-transparent shadow-sm sm:text-sm font-medium sm:rounded-md text-white bg-theme-600 hover:bg-theme-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-500",
                                  loading && "opacity-50 cursor-not-allowed"
                                )}
                                type="submit"
                              >
                                <div>{t("shared.invite")}</div>
                              </button>
                            </div>
                          </div>
                        </form>
                      );
                    }
                  })()}
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <ErrorModal ref={errorModal} />
      <SuccessModal ref={successModal} onClosed={close} />
      <SelectWorkspaces ref={selectWorkspaces} onSelected={selectedWorkspaces} />
    </div>
  );
}
