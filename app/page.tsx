'use client';

import { useState } from 'react';
import { CameraFeed } from '@/app/components/Camera/CameraFeed';
import { PermissionPrompt } from '@/app/components/Camera/PermissionPrompt';

export default function Home() {
  const [hasAcceptedPermissions, setHasAcceptedPermissions] = useState(false);

  if (!hasAcceptedPermissions) {
    return <PermissionPrompt onAllow={() => setHasAcceptedPermissions(true)} />;
  }

  return <CameraFeed />;
}
