import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGardService} from '../app/Service/auth-gard.service';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [AuthGardService],
  },
  {
    path: 'shop-dashboard',
    loadChildren: () => import('./Pages/shop-dashboard/shop-dashboard.module').then( m => m.ShopDashboardPageModule)
  },
  {
    path: 'product-details',
    loadChildren: () => import('./Pages/product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('./Pages/wallet/wallet.module').then( m => m.WalletPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./Pages/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'view-cycle',
    loadChildren: () => import('./Pages/view-cycle/view-cycle.module').then( m => m.ViewCyclePageModule)
  },
  {
    path: 'box-analytics',
    loadChildren: () => import('./Pages/box-analytics/box-analytics.module').then( m => m.BoxAnalyticsPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./Pages/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./Pages/privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./Pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./Pages/otp/otp.module').then( m => m.OTPPageModule)
  },
  {
    path: 'payment-method',
    loadChildren: () => import('./Pages/payment-method/payment-method.module').then( m => m.PaymentMethodPageModule)
  },
  {
    path: 'create-profile',
    loadChildren: () => import('./pages/create-profile/create-profile.module').then( m => m.CreateProfilePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [AuthGardService],
  },
  {
    path: 'shop-dashboard',
    loadChildren: () => import('./Pages/shop-dashboard/shop-dashboard.module').then( m => m.ShopDashboardPageModule)
  },
  {
    path: 'product-details/:data',

    loadChildren: () => import('./Pages/product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('./Pages/wallet/wallet.module').then( m => m.WalletPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./Pages/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'view-cycle',
    loadChildren: () => import('./Pages/view-cycle/view-cycle.module').then( m => m.ViewCyclePageModule)
  },
  {
    path: ':cycleid/box-analytics',
    loadChildren: () => import('./Pages/box-analytics/box-analytics.module').then( m => m.BoxAnalyticsPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./Pages/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./Pages/privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./Pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./Pages/otp/otp.module').then( m => m.OTPPageModule)
  },
  {
    path: 'payment-method',
    loadChildren: () => import('./Pages/payment-method/payment-method.module').then( m => m.PaymentMethodPageModule)
  },

  {
    path: 'home',
    loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'walletbank',
    loadChildren: () => import('./Pages/wallettobank/wallettobank.module').then( m => m.WallettobankPageModule)
  },
  {
    path: 'pages-addbank',
    loadChildren: () => import('./Pages/pages-addbank/pages-addbank.module').then( m => m.PagesAddbankPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./Pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'upload-doc',
    loadChildren: () => import('./Pages/upload-doc/upload-doc.module').then( m => m.UploadDocPageModule)
  },
  {
    path: 'select-card',
    loadChildren: () => import('./Pages/select-card/select-card.module').then( m => m.SelectCardPageModule)
  },
  {
    path: 'chat-page',
    loadChildren: () => import('./pages/chat-page/chat-page.module').then( m => m.ChatPagePageModule)
  },
  // {
  //   path: 'chat-page/:chatid',
  //   loadChildren: () => import('./pages/chat-page/chat-page.module').then( m => m.ChatPagePageModule)
  // },
  {
    path: 'added-payments',
    loadChildren: () => import('./pages/added-payments/added-payments.module').then( m => m.AddedPaymentsPageModule)
  },
  {
    path: 'profile-page/:id',
    loadChildren: () => import('./pages/profile-page/profile-page.module').then( m => m.ProfilePagePageModule)
  },
  {
    path: 'chatroom',
    loadChildren: () => import('./Pages/chat-room/chat-room.module').then( m => m.ChatRoomPageModule)
  },
  {
    path: 'terms-conditions',
    loadChildren: () => import('./pages/terms-conditions/terms-conditions.module').then( m => m.TermsConditionsPageModule)
  },
  {
    path: 'shopping-cart',
    loadChildren: () => import('./pages/shopping-cart/shopping-cart.module').then( m => m.ShoppingCartPageModule)
  },
  {
    path: 'add-address',
    loadChildren: () => import('./pages/add-address/add-address.module').then( m => m.AddAddressPageModule)
  },
  {
    path: 'shopping-history',
    loadChildren: () => import('./pages/shopping-history/shopping-history.module').then( m => m.ShoppingHistoryPageModule)
  },
  {
    path: 'order-details',
    loadChildren: () => import('./pages/order-details/order-details.module').then( m => m.OrderDetailsPageModule)
  },
  {
    path: 'searched-product',
    loadChildren: () => import('./pages/searched-product/searched-product.module').then( m => m.SearchedProductPageModule)
  },
  {
    path: 'seller-chats',
    loadChildren: () => import('./pages/seller-chats/seller-chats.module').then( m => m.SellerChatsPageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./pages/forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'shop-chat-page',
    loadChildren: () => import('./pages/shop-chat-page/shop-chat-page.module').then( m => m.ShopChatPagePageModule)
  },
  {
    path: 'shop-chat-room',
    loadChildren: () => import('./pages/shop-chat-room/shop-chat-room.module').then( m => m.ShopChatRoomPageModule)
  },
  {
    path: 'verify-identity',
    loadChildren: () => import('./pages/verify-identity/verify-identity.module').then( m => m.VerifyIdentityPageModule)
  },
  {
    path: 'setup-wallet',
    loadChildren: () => import('./pages/setup-wallet/setup-wallet.module').then( m => m.SetupWalletPageModule)
  },
  {
    path: 'funding-sources',
    loadChildren: () => import('./pages/funding-sources/funding-sources.module').then( m => m.FundingSourcesPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
