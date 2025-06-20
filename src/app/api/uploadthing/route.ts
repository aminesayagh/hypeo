import { createRouteHandler } from 'uploadthing/next';

import { ourFileRouter } from '@/services/uploadthing/route';

export const { GET, POST } = createRouteHandler({ router: ourFileRouter });
