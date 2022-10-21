import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Unauthorized() {
  const { t } = useTranslation();
  return (
    <div className="justify-center md:grid md:space-x-2 pt-5 px-3 mx-auto max-w-2xl">
      <div className="max-w-md mx-auto px-4 lg:px-10 flex justify-center py-4 md:py-8 lg:py-12 rounded-sm text-center flex-col">
        <div className="flex mx-4">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[400px] text-center">
              <h2
                className="
                 font-bold
                 text-blue-500

                 mb-2
                 text-[50px]
                 sm:text-[80px]
                 md:text-[100px]
                 leading-none
                 "
              >
                4🔒3
              </h2>
              <h1 className="text-lg text-gray-400 font-bold mx-auto mt-1 p-1 justify-center items-center flex w-full">
                {t('shared.unauthorized')}
              </h1>

              <Link
                to="/admin"
                className="
                 text-base
                 font-semibold
                 text-blue-500
                 hover:text-white
                 inline-block
                 text-center
                 border border-blue-500
                 rounded-lg
                 px-8
                 py-3
                 hover:bg-blue-500 hover:text-primary
                 transition
                 "
              >
                Go To Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
