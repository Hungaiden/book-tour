import type { Express } from 'express';

import { accountsRoute } from './accounts/account.route';
import { authsRoute } from './accounts/auth.route';

import { toursRoute } from './tours/tour.route';
import { toursCategoryRoute } from './tours/tourCategory.route';
import { tourReviewRoute } from './tours/tourReview.route';
import { tourBookingRoute } from './tours/tourBooking.route';

import { hotelsRoute } from './hotels/hotel.route';
import { hotelBookingRoute } from './hotels/hotelBooking.route';
import { hotelReviewRoute } from './hotels/hotelReview.route';
import { roomTypeRoute } from './hotels/roomType.route';

import { flightRoute } from './flights/flight.route';
import { ticketClassRoute } from './flights/ticketClass.route';
import { airportRoute } from './flights/airport.route';
import { flightBookingRoute } from './flights/flightBooking.route';
import { flightReviewRoute } from './flights/flightReview.route';
import { airlineRoute } from './flights/airline.route';
import { GeminiRoute } from '../client/tours/gemini.route';
import { dashboardRoute } from './dashboard/dashboard.route';
import { systemSettingsRoute } from './settings/systemSetting.route';
import uploadRoute from './upload.route';

import { VNPayRoute } from '../client/payment/vnpay.route';

import { profileRoute } from './profiles/profile.route';

const adminRoutes = (app: Express) => {
  // All routes without /admin prefix
  // Auth middleware in route files will handle access control
  // - GET endpoints: no auth required or optional (for users)
  // - POST/PATCH/DELETE endpoints: auth required (for admins)

  // IMPORTANT: Register specific routes BEFORE general routes
  // This prevents more general routes from catching specific route requests

  // ==================== TOURS - SPECIFIC ROUTES FIRST ====================
  app.use('/tours/reviews', tourReviewRoute);
  app.use('/tours/bookings', tourBookingRoute);
  app.use('/tours', toursRoute);

  // ==================== CATEGORIES ====================
  app.use('/tour-categories', toursCategoryRoute);

  // ==================== HOTELS - SPECIFIC ROUTES FIRST ====================
  app.use('/hotels/reviews', hotelReviewRoute);
  app.use('/hotels/bookings', hotelBookingRoute);
  app.use('/hotels', hotelsRoute);
  app.use('/room-types', roomTypeRoute);

  // ==================== FLIGHTS - SPECIFIC ROUTES FIRST ====================
  app.use('/flights/reviews', flightReviewRoute);
  app.use('/flights/bookings', flightBookingRoute);
  app.use('/flights/airports', airportRoute);
  app.use('/flights/airlines', airlineRoute);
  app.use('/flights', flightRoute);
  app.use('/ticket-classes', ticketClassRoute);

  // ==================== ACCOUNTS & AUTH ====================
  app.use('/accounts', accountsRoute);
  app.use('/auth', authsRoute);

  // ==================== UPLOAD ====================
  app.use('/upload', uploadRoute);

  // ==================== GEMINI ====================
  app.use('/gemini', GeminiRoute);

  // ==================== PAYMENT ====================
  app.use('/payment', VNPayRoute);

  // ==================== DASHBOARD (ADMIN ONLY - AUTH REQUIRED IN ROUTE) ====================
  app.use('/dashboard', dashboardRoute);

  // ==================== SYSTEM SETTINGS (ADMIN ONLY) ====================
  app.use('/system-settings', systemSettingsRoute);

  // ==================== PROFILE ====================
  app.use('/profile', profileRoute);
};

export default adminRoutes;
