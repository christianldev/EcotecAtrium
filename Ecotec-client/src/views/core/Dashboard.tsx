import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserDto } from "@/application/dtos/core/users/UserDto";
import ClientsUsage from "@/components/app/usages/ClientsUsage";
import EmployeesUsage from "@/components/app/usages/EmployeesUsage";
import ProvidersUsage from "@/components/app/usages/ProvidersUsage";
import MySubscriptionProducts from "@/components/core/settings/subscription/MySubscriptionProducts";
import { RootState } from "@/store";
import UserUtils from "@/utils/store/UserUtils";
import { useSelector } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Dashboard() {
  const { t } = useTranslation();


  return (
    <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
      <HelmetProvider>
        <Helmet>
          <title>{t("app.sidebar.dashboard")} | PRODUCT_NAME</title>
        </Helmet>
      </HelmetProvider>
      {/*Page header */}
   

      <div className="px-4 sm:px-8 max-w-5xl mx-auto py-5 grid gap-5">
        <div className="mt-2 grid sm:grid-cols-1 gap-5">
          <div className="space-y-5">
            <MySubscriptionProducts withCurrentPlan={true} cols="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-4" />
            <div>
              <div>
                <div className="flex items-center space-x-2 justify-between">
                  <h3 className="leading-5 text-gray-900">{t("app.dashboard.summary")}</h3>
                </div>

                <dl className="mt-2 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-4">
                  <ProvidersUsage />
                  <ClientsUsage />
                  <EmployeesUsage />
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
