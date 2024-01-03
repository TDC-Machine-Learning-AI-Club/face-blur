'use server'

import { auth } from '@/auth'
import { Database } from '@/types/db_types'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

type createDocumentResponse = {
  success: boolean
  message?: string
  documentId?: string
}

type documentType = 'application_document' | 'others'

export async function createDocument(
  fileUrl: string,
  randomUUID: string,
  type: documentType
): Promise<createDocumentResponse> {
  const cookieStore = cookies()
  const session = await auth({ cookieStore })
  const extension = fileUrl.split('.').pop()

  if (!session?.user) {
    return {
      success: false,
      message: 'User not authenticated'
    }
  }

  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore
  })

  const { data, error } = await supabase.from('documents').insert([
    {
      id: randomUUID,
      user_id: session.user.id,
      file_path: fileUrl,
      type: type,
      extension: extension
    }
  ])

  if (error) {
    console.error('Error creating document:', error)
    return {
      success: false,
      message: `Error creating document : ${JSON.stringify(
        error
      )} , ${JSON.stringify(session)}`
    }
  }

  return {
    success: true,
    documentId: `${JSON.stringify(data)}`
  }
}

type UploadFileResponse = {
  success: boolean
  message?: string
  publicUrl?: string
}
