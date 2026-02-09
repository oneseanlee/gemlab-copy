// @ts-nocheck
import React from 'react';
import './OceanRaysPage.css';

const OceanRaysPage = () => {
  return (
    <div className="ocean-rays-page bg-slate-50 text-slate-800 antialiased selection:bg-teal-200 selection:text-teal-900 mesh-gradient min-h-screen flex flex-col">

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b border-slate-200/50">
        <div className="flex h-16 max-w-7xl mr-auto ml-auto pr-6 pl-6 items-center justify-between">
          <button className="md:hidden text-slate-600">
            <iconify-icon icon="lucide:menu" width="24" stroke-width="1.5"></iconify-icon>
          </button>
          <a href="#" className="flex items-center">
            <img src="/images/best365labs-logo.png" alt="Best365 Labs" className="h-8" />
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <a href="#shop" className="hover:text-slate-900 transition-colors duration-200">Shop</a>
            <a href="#benefits" className="hover:text-slate-900 transition-colors duration-200">The Science</a>
            <a href="#about" className="hover:text-slate-900 transition-colors duration-200">Our Source</a>
            <a href="#recipes" className="hover:text-slate-900 transition-colors duration-200">Recipes</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-600 hover:text-slate-900 transition-colors relative">
              <iconify-icon icon="lucide:search" width="20" stroke-width="1.5"></iconify-icon>
            </button>
            <button className="text-slate-600 hover:text-slate-900 transition-colors relative group">
              <iconify-icon icon="lucide:shopping-bag" width="20" stroke-width="1.5"></iconify-icon>
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-teal-500 rounded-full group-hover:scale-125 transition-transform duration-200"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="overflow-hidden pt-32 pr-6 pb-20 pl-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mr-auto ml-auto gap-x-12 gap-y-12 items-center">
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-medium border border-teal-100/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              New Harvest Available
            </div>
            <h1 className="md:text-7xl leading-[1.1] text-5xl font-medium text-slate-900 tracking-tight">Good for body Good for brain, <br /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-600">bottled fresh.</span></h1>
            <p className="leading-relaxed text-lg text-slate-500 max-w-md">
              Experience the 92 essential minerals your body craves. Wildcrafted, organic sea moss gel designed for cellular regeneration and holistic balance.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="https://www.whatnot.com/user/theoceanrays" className="group hover:bg-slate-800 transition-all duration-300 flex items-center gap-2 shadow-slate-200 text-sm font-medium text-white bg-slate-900 rounded-full pt-3 pr-8 pb-3 pl-8 relative shadow-lg">
                Shop Collection
                <iconify-icon icon="lucide:arrow-right" className="group-hover:translate-x-1 transition-transform" width="16" stroke-width="1.5"></iconify-icon>
              </a>
              <button className="hover:border-slate-300 transition-colors flex gap-2 text-sm font-medium text-slate-600 bg-white border-slate-200 border rounded-full pt-3 pr-8 pb-3 pl-8 gap-x-2 gap-y-2 items-center">
                <iconify-icon icon="lucide:play-circle" width="16" stroke-width="1.5"></iconify-icon>
                Watch the Process
              </button>
            </div>
            <div className="pt-8 flex items-center gap-6 text-slate-400 text-xs font-medium uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <iconify-icon icon="lucide:droplets" width="16" stroke-width="1.5"></iconify-icon>
                Wildcrafted
              </div>
              <div className="flex items-center gap-2">
                <iconify-icon icon="lucide:vegan" width="16" stroke-width="1.5"></iconify-icon>
                Organic
              </div>
              <div className="flex items-center gap-2">
                <iconify-icon icon="lucide:shield-check" width="16" stroke-width="1.5"></iconify-icon>
                Lab Tested
              </div>
            </div>
          </div>

          <div className="lg:h-[600px] flex relative items-center justify-center">
            <div className="bg-gradient-to-tr from-teal-200/30 to-purple-200/30 opacity-60 rounded-full absolute top-0 right-0 bottom-0 left-0 blur-3xl"></div>
            <div className="relative z-10 w-full max-w-md aspect-[4/5] bg-white rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100 group">
              <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/dd1a4eda-6472-4294-a070-1bb7e507618b_1600w.png" alt="Ocean Rays Sea Moss Gel" className="group-hover:scale-105 transition-transform duration-700 ease-in-out w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/90 to-transparent">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="uppercase text-xs font-medium text-teal-600 tracking-wider mb-1">Best Seller</p>
                    <h3 className="text-xl font-medium text-slate-900 tracking-tight">Hummingbird Sea Moss Gel</h3>
                  </div>
                  <span className="text-lg font-medium text-slate-900">$25.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="w-full bg-slate-900 text-slate-300 py-3 overflow-hidden whitespace-nowrap">
        <div className="inline-flex gap-12 text-xs font-medium tracking-widest uppercase" style={{ animation: 'marquee 20s linear infinite' }}>
          <span>Gut Health</span><span>•</span>
          <span>Immunity Support</span><span>•</span>
          <span>Radiant Skin</span><span>•</span>
          <span>Thyroid Balance</span><span>•</span>
          <span>Energy Boost</span><span>•</span>
          <span>Gut Health</span><span>•</span>
          <span>Immunity Support</span><span>•</span>
          <span>Radiant Skin</span><span>•</span>
          <span>Thyroid Balance</span><span>•</span>
          <span>Energy Boost</span><span>•</span>
          <span>Gut Health</span><span>•</span>
          <span>Immunity Support</span><span>•</span>
          <span>Radiant Skin</span><span>•</span>
          <span>Thyroid Balance</span><span>•</span>
          <span>Energy Boost</span>
        </div>
      </div>

      {/* Shop Section */}
      <section className="bg-white pt-24 pr-6 pb-24 pl-6" id="shop">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end gap-6 mb-16 gap-x-6 gap-y-6 justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-slate-900 mb-4">Curated Wellness</h2>
              <p className="text-slate-500 max-w-lg">Sourced sustainably from the pristine waters of St. Lucia. Each jar is made to order to ensure maximum freshness and potency.</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="hover:bg-slate-200 transition-colors text-sm font-medium text-slate-900 bg-slate-100 rounded-lg pt-2 pr-4 pb-2 pl-4">All Products</button>
              <button className="px-4 py-2 rounded-lg bg-white text-slate-500 text-sm font-medium border border-slate-200 hover:border-slate-300 transition-colors">Bundles</button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Product Card 1 */}
            <div className="group relative">
              <div className="relative aspect-square rounded-2xl bg-slate-50 overflow-hidden mb-5 border border-slate-100">
                <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5265f8a5-9731-43cc-87c1-91e816288ebd_800w.png" alt="Gold Sea Moss" className="group-hover:scale-105 transition-transform duration-500 mix-blend-multiply w-full h-full object-cover" />
                <button className="absolute bottom-4 right-4 h-10 w-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-900 hover:bg-teal-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7-7v14"></path></svg>
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-slate-900 tracking-tight mb-1">Magic Mango Sea Moss Gel 12oz</h3>
                  <p className="text-sm text-slate-500">Daily Multi-Mineral</p>
                </div>
                <span className="text-sm font-medium text-slate-900">$25.00</span>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="group relative">
              <div className="relative aspect-square rounded-2xl bg-slate-50 overflow-hidden mb-5 border border-slate-100">
                <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/855ab896-1602-4568-b024-95f76e8f7474_800w.png" alt="Purple Sea Moss" className="group-hover:scale-105 transition-transform duration-500 mix-blend-multiply w-full h-full object-cover" />
                <div className="absolute top-4 left-4 px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-md">High Antioxidant</div>
                <button className="absolute bottom-4 right-4 h-10 w-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-900 hover:bg-teal-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                  <iconify-icon icon="lucide:plus" width="20" stroke-width="1.5"></iconify-icon>
                </button>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-slate-900 tracking-tight mb-1">Red Bird Sea Moss Gel 12 oz</h3>
                  <p className="text-sm text-slate-500">Rare &amp; Potent</p>
                </div>
                <span className="text-sm font-medium text-slate-900">$20</span>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className="group relative">
              <div className="relative aspect-square rounded-2xl bg-slate-50 overflow-hidden mb-5 border border-slate-100">
                <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/bebbcab0-4d36-4990-9730-eec0541fc8c5_800w.png" alt="Infused Sea Moss" className="group-hover:scale-105 transition-transform duration-500 mix-blend-multiply w-full h-full object-cover" />
                <button className="absolute bottom-4 right-4 h-10 w-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-900 hover:bg-teal-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                  <iconify-icon icon="lucide:plus" width="20" stroke-width="1.5"></iconify-icon>
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-slate-900 tracking-tight mb-1">BlueBird Sea Moss Gel 12 oz</h3>
                  <p className="text-sm text-slate-500">Immunity Blend</p>
                </div>
                <span className="text-sm font-medium text-slate-900">$20</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Science Section */}
      <section className="border-slate-200 border-t pt-24 pr-6 pb-24 pl-6" id="benefits">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-slate-900 mb-6">Why Sea Moss?</h2>
              <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                Sea moss contains 92 of the 102 minerals that our bodies are composed of. It is the ocean's most powerful superfood, offering a comprehensive boost to your daily wellness routine without synthetic additives.
              </p>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <iconify-icon icon="lucide:check" width="14" stroke-width="2"></iconify-icon>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-slate-900">Digestive Health</h4>
                    <p className="text-sm text-slate-500 mt-1">Acts as a prebiotic, soothing the digestive tract and promoting gut health.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <iconify-icon icon="lucide:check" width="14" stroke-width="2"></iconify-icon>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-slate-900">Skin Elasticity</h4>
                    <p className="text-sm text-slate-500 mt-1">Rich in collagen-promoting compounds that hydrate skin and reduce inflammation.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <iconify-icon icon="lucide:check" width="14" stroke-width="2"></iconify-icon>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-slate-900">Sustained Energy</h4>
                    <p className="text-sm text-slate-500 mt-1">Iron-rich content helps transport oxygen to cells for natural energy.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-slate-100 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 p-32 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="relative z-10 h-full flex flex-col justify-center">
                <div className="space-y-6">
                  <div className="glass-panel p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-slate-500">Mineral Density</span>
                      <span className="text-sm font-medium text-teal-600">92/102</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 w-[90%] rounded-full"></div>
                    </div>
                  </div>
                  <div className="glass-panel p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-slate-500">Bioavailability</span>
                      <span className="text-sm font-medium text-teal-600">High</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 w-[85%] rounded-full"></div>
                    </div>
                  </div>
                  <div className="pt-6">
                    <blockquote className="text-lg font-medium text-slate-800 italic">
                      "I've replaced my entire supplement cabinet with just two tablespoons of Ocean Rays a day."
                    </blockquote>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-300 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="User" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Sarah M.</p>
                        <p className="text-xs text-slate-500">Verified Buyer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription / Newsletter */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-slate-900 z-0"></div>
        <div className="z-0 bg-gradient-to-b from-teal-900/20 to-slate-900 absolute top-0 right-0 bottom-0 left-0"></div>
        <div className="text-center max-w-3xl z-10 mr-auto ml-auto relative">
          <iconify-icon icon="lucide:waves" className="text-teal-400 mb-6" width="32" stroke-width="1.5"></iconify-icon>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6">Join the Wave</h2>
          <p className="text-slate-400 mb-10 text-lg">Subscribe for wellness tips, new harvest alerts, and 10% off your first order.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="email@address.com" className="flex-1 bg-white/10 border border-white/10 rounded-full px-6 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 backdrop-blur-sm transition-all" />
            <button type="button" className="bg-white text-slate-900 px-8 py-3 rounded-full font-medium hover:bg-teal-50 transition-colors">Subscribe</button>
          </form>
          <p className="mt-4 text-xs text-slate-600">No spam, just good vibes. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-16 pb-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            <div className="col-span-2 md:col-span-1">
              <a href="#" className="flex items-center mb-6">
                <img src="/images/best365labs-logo.png" alt="Best365 Labs" className="h-7" />
              </a>
              <p className="text-sm text-slate-500 mb-6">Elevating human consciousness through cellular nutrition. Sourced with respect for the ocean.</p>
              <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                  <iconify-icon icon="lucide:instagram" width="20" stroke-width="1.5"></iconify-icon>
                </a>
                <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                  <iconify-icon icon="lucide:twitter" width="20" stroke-width="1.5"></iconify-icon>
                </a>
                <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                  <iconify-icon icon="lucide:facebook" width="20" stroke-width="1.5"></iconify-icon>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-slate-900 mb-4">Shop</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a href="#" className="hover:text-teal-600 transition-colors">All Gels</a></li>
                <li><a href="#" className="hover:text-teal-600 transition-colors">Bundles</a></li>
                <li><a href="#" className="hover:text-teal-600 transition-colors">Wholesale</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-900 mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a href="#" className="hover:text-teal-600 transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-teal-600 transition-colors">Sourcing</a></li>
                <li><a href="#" className="hover:text-teal-600 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a href="#" className="hover:text-teal-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-teal-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-teal-600 transition-colors">Shipping</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <p>© 2023 Ocean Rays. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1"><iconify-icon icon="lucide:credit-card" width="14"></iconify-icon> Secure Payment</span>
              <span className="flex items-center gap-1"><iconify-icon icon="lucide:truck" width="14"></iconify-icon> Global Shipping</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OceanRaysPage;
