// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    list: path(ROOTS_DASHBOARD, '/blog/list'),
    view: (title) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    edit: (name) => path(ROOTS_DASHBOARD, `/blog/${name}/edit`),
    demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
  job: {
    root: path(ROOTS_DASHBOARD, '/job'),
    posts: path(ROOTS_DASHBOARD, '/job/posts'),
    new: path(ROOTS_DASHBOARD, '/job/new'),
    list: path(ROOTS_DASHBOARD, '/job/list'),
    view: (title) => path(ROOTS_DASHBOARD, `/job/post/${title}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/job/${id}/edit`),
    applicants: (job_id) => path(ROOTS_DASHBOARD, `/job/applicants/${job_id}`),
    demoView: path(ROOTS_DASHBOARD, '/job/post/apply-these-7-secret-techniques-to-improve-event'),
  },
  resources: {
    root: path(ROOTS_DASHBOARD, '/resources'),
    posts: path(ROOTS_DASHBOARD, '/resources/posts'),
    new: path(ROOTS_DASHBOARD, '/resources/new'),
    list: path(ROOTS_DASHBOARD, '/resources/list'),
    view: (title) => path(ROOTS_DASHBOARD, `/resources/post/${title}`),
    edit: (name) => path(ROOTS_DASHBOARD, `/resources/${name}/edit`),
    demoView: path(ROOTS_DASHBOARD, '/resources/post/apply-these-7-secret-techniques-to-improve-event'),
  },
  employees: {
    root: path(ROOTS_DASHBOARD, '/employees'),
    // posts: path(ROOTS_DASHBOARD, '/job/posts'),
    // new: path(ROOTS_DASHBOARD, '/job/new'),
    list: path(ROOTS_DASHBOARD, '/employees/list'),
    // view: (title) => path(ROOTS_DASHBOARD, `/job/post/${title}`),
    // edit: (id) => path(ROOTS_DASHBOARD, `/job/${id}/edit`),
    // applicants: (job_id) => path(ROOTS_DASHBOARD, `/job/applicants/${job_id}`),
    // demoView: path(ROOTS_DASHBOARD, '/job/post/apply-these-7-secret-techniques-to-improve-event'),
  },
  employers: {
    root: path(ROOTS_DASHBOARD, '/employers'),
    // posts: path(ROOTS_DASHBOARD, '/job/posts'),
    // new: path(ROOTS_DASHBOARD, '/job/new'),
    list: path(ROOTS_DASHBOARD, '/employers/list'),
    // view: (title) => path(ROOTS_DASHBOARD, `/job/post/${title}`),
    // edit: (id) => path(ROOTS_DASHBOARD, `/job/${id}/edit`),
    // applicants: (job_id) => path(ROOTS_DASHBOARD, `/job/applicants/${job_id}`),
    // demoView: path(ROOTS_DASHBOARD, '/job/post/apply-these-7-secret-techniques-to-improve-event'),
  },
  videos: {
    root: path(ROOTS_DASHBOARD, '/videos'),
    // posts: path(ROOTS_DASHBOARD, '/videos/posts'),
    new: path(ROOTS_DASHBOARD, '/videos/new'),
    list: path(ROOTS_DASHBOARD, '/videos/list'),
    view: (title) => path(ROOTS_DASHBOARD, `/videos/post/${title}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/videos/${id}/edit`),
    // applicants: (job_id) => path(ROOTS_DASHBOARD, `/videos/applicants/${job_id}`),
    // demoView: path(ROOTS_DASHBOARD, '/job/post/apply-these-7-secret-techniques-to-improve-event'),
  },
  podcasts: {
    root: path(ROOTS_DASHBOARD, '/podcasts'),
    // posts: path(ROOTS_DASHBOARD, '/podcasts/posts'),
    new: path(ROOTS_DASHBOARD, '/podcasts/new'),
    list: path(ROOTS_DASHBOARD, '/podcasts/list'),
    view: (title) => path(ROOTS_DASHBOARD, `/podcasts/post/${title}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/podcasts/${id}/edit`),
    // applicants: (job_id) => path(ROOTS_DASHBOARD, `/videos/applicants/${job_id}`),
    // demoView: path(ROOTS_DASHBOARD, '/job/post/apply-these-7-secret-techniques-to-improve-event'),
  },
  events: {
    root: path(ROOTS_DASHBOARD, '/events'),
    // posts: path(ROOTS_DASHBOARD, '/events/posts'),
    new: path(ROOTS_DASHBOARD, '/events/new'),
    list: path(ROOTS_DASHBOARD, '/events/list'),
    view: (title) => path(ROOTS_DASHBOARD, `/events/post/${title}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/events/${id}/edit`),
    // applicants: (job_id) => path(ROOTS_DASHBOARD, `/videos/applicants/${job_id}`),
    // demoView: path(ROOTS_DASHBOARD, '/job/post/apply-these-7-secret-techniques-to-improve-event'),
  },
  clients: {
    root: path(ROOTS_DASHBOARD, '/clients'),
    new: path(ROOTS_DASHBOARD, '/clients/new'),
    list: path(ROOTS_DASHBOARD, '/clients/list'),

  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
