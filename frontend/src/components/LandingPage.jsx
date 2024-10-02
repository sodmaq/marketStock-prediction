const LandingPage = () => {
  return (
    <>
      <header className="bg-white dark:bg-gray-900">
        <div className="lg:flex">
          <div className="flex items-center justify-center w-full px-6 py-8 lg:h-[32rem] lg:w-1/2">
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl font-libre">
                stock exchange forecasts for the{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  banking system
                </span>
              </h2>

              <p className="mt-4 text-sm dark:text-gray-400 lg:text-base font-libre ">
                In today's fast-moving financial markets, accurate stock
                predictions are crucial for banks, but traditional methods often
                fall short. Advanced machine learning, particularly unsupervised
                learning, provides powerful insights by analyzing large sets of
                unlabelled data to identify hidden patterns. This approach is
                especially effective in the complex and data-rich environment of
                stock exchanges, helping banks make more informed investment
                decisions.
              </p>

              <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
                <button
                  className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-700 cursor-pointer"
                  onClick={() => (window.location.href = "/stock")}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>

          <div className="w-full h-64 lg:w-1/2 lg:h-auto">
            <img
              src="finance.png"
              alt="Finance"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <div className="flex items-center justify-between"></div>
          <h1>
            <p className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl text-center">
              What you can do with this app
            </p>
          </h1>

          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            <div>
              <img
                className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                src="https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt=""
              />
              <div className="mt-8">
                <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                  Data Collection
                </h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  The system collects and processes a wide range of stock market
                  data, including historical stock prices, trading volumes,
                  market sentiment, and economic indicators. By analyzing this
                  data, we can build comprehensive models that reflect
                  real-world market dynamics.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <a
                    href="#"
                    className="inline-block text-blue-500 underline hover:text-blue-400"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>

            <div>
              <img
                className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt=""
              />
              <div className="mt-8">
                <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                  Pattern Recognition
                </h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Through unsupervised learning, the system identifies patterns
                  and correlations within the data that are not immediately
                  obvious to human analysts. It groups stocks into clusters
                  based on similar behaviors and market performance, making it
                  easier to understand underlying trends.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <a
                    href="#"
                    className="inline-block text-blue-500 underline hover:text-blue-400"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>

            <div>
              <img
                className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                src="https://images.unsplash.com/photo-1597534458220-9fb4969f2df5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
                alt=""
              />
              <div className="mt-8">
                <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                  Risk Management
                </h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  By forecasting potential stock movements, our system aids
                  banking institutions in managing risk more effectively. This
                  predictive capability allows banks to anticipate market
                  fluctuations and adjust their portfolios accordingly,
                  optimizing returns while mitigating potential losses.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <a
                    href="#"
                    className="inline-block text-blue-500 underline hover:text-blue-400"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900 mb-20">
        <div className="container px-6 py-8 mx-auto">
          <h2 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
            Our Team
          </h2>

          <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Team member 1 */}
            <div className="w-full max-w-xs text-center">
              <img
                className="object-cover object-center w-full h-48 mx-auto rounded-lg"
                src="person1.jpg"
                alt="Oladejo Toheeb Ayobami"
              />
              <div className="mt-2">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                  Oladejo Toheeb Ayobami
                </h3>
                <span className="mt-1 font-medium text-gray-600 dark:text-gray-300">
                  Computer scientist
                </span>
              </div>
            </div>

            {/* Team member 2 */}
            <div className="w-full max-w-xs text-center">
              <img
                className="object-fill object-center w-full h-48 mx-auto rounded-lg"
                src="person2.jpg"
                alt="Jane Doe"
              />
              <div className="mt-2">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                  Ganiyu Rofiat Olatundun
                </h3>
                <span className="mt-1 font-medium text-gray-600 dark:text-gray-300">
                  Computer scientist
                </span>
              </div>
            </div>

            {/* Team member 3 */}
            <div className="w-full max-w-xs text-center">
              <img
                className="object-cover object-center w-full h-48 mx-auto rounded-lg"
                src="person3.jpg"
                alt="Steve Ben"
              />
              <div className="mt-2">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                  Olatunbosun Barakat Dasola
                </h3>
                <span className="mt-1 font-medium text-gray-600 dark:text-gray-300">
                  Computer scientist
                </span>
              </div>
            </div>

            {/* Team member 4 */}
            <div className="w-full max-w-xs text-center">
              <img
                className="object-fill object-center w-full h-48 mx-auto rounded-lg"
                src="person4.jpg"
              />
              <div className="mt-2">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                  Ayodeji pelumi Oluwadamilola
                </h3>
                <span className="mt-1 font-medium text-gray-600 dark:text-gray-300">
                  Computer scientist
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
