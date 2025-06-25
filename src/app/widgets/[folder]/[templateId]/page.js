
import React from 'react'
import { WidgetPreview } from '@/components'

const page = ({ params }) => {
  return (
    <WidgetPreview
      folder={params.folder}
      templateId={params.templateId}
    />
  )
}

export default page
