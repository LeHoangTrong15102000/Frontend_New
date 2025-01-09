import { API_KEY } from '@/config'
import type { Feedbacktype } from '@/types/app'
import type {
  IOnCompleted,
  IOnData,
  IOnError,
  IOnFile,
  IOnMessageEnd,
  IOnMessageReplace,
  IOnNodeFinished,
  IOnNodeStarted,
  IOnThought,
  IOnWorkflowFinished,
  IOnWorkflowStarted
} from './base'
import { get, post, ssePost } from './base'

export const sendChatMessage = async (
  body: Record<string, any>,
  {
    onData,
    onCompleted,
    onThought,
    onFile,
    onError,
    getAbortController,
    onMessageEnd,
    onMessageReplace,
    onWorkflowStarted,
    onNodeStarted,
    onNodeFinished,
    onWorkflowFinished
  }: {
    onData: IOnData
    onCompleted: IOnCompleted
    onFile: IOnFile
    onThought: IOnThought
    onMessageEnd: IOnMessageEnd
    onMessageReplace: IOnMessageReplace
    onError: IOnError
    getAbortController?: (abortController: AbortController) => void
    onWorkflowStarted: IOnWorkflowStarted
    onNodeStarted: IOnNodeStarted
    onNodeFinished: IOnNodeFinished
    onWorkflowFinished: IOnWorkflowFinished
  }
) => {
  return ssePost(
    'chat-messages',
    {
      body: {
        ...body,
        response_mode: 'streaming'
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
        DNT: '1',
        'User-Agent': navigator.userAgent,
        'X-Requested-With': 'XMLHttpRequest',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers':
          'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        Connection: 'keep-alive'
      },
      credentials: 'include'
    },
    {
      onData,
      onCompleted,
      onThought,
      onFile,
      onError,
      getAbortController,
      onMessageEnd,
      onMessageReplace,
      onNodeStarted,
      onWorkflowStarted,
      onWorkflowFinished,
      onNodeFinished
    }
  )
}

export const fetchConversations = async (user: string) => {
  return get('conversations', { params: { limit: 100, first_id: '', user: user } })
}

export const fetchChatList = async (conversationId: string) => {
  return get('messages', { params: { conversation_id: conversationId, limit: 20, last_id: '' } })
}

// init value. wait for server update
export const fetchAppParams = async () => {
  return get('parameters')
}

export const updateFeedback = async ({ url, body }: { url: string; body: Feedbacktype }) => {
  return post(url, { body })
}

export const generationConversationName = async (id: string) => {
  return post(`conversations/${id}/name`, { body: { auto_generate: true } })
}
