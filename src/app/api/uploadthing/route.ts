import { createRouteHandler } from 'uploadthing/next';

import { ourFileRouter } from '@/services/foundations/uploadthing/route';

export const { GET, POST } = createRouteHandler({ router: ourFileRouter });
