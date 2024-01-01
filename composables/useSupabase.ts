import type { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'

import { useNuxtApp, useRuntimeConfig } from '#imports'

export function useSupabase() {
	const nuxtApp = useNuxtApp()
	const cfg = useRuntimeConfig()

	if (!cfg?.public?.supabase?.url || !cfg?.public?.supabase?.key) {
		console.error('[LOCAL]: Missing Supabase configuration')
	}

	if (!nuxtApp._supabaseClient && cfg.public.supabase.url) {
		const supabaseClient: SupabaseClient = createClient(
			cfg.public.supabase.url,
			cfg.public.supabase.key,
			{
				auth: {
					storageKey: 'supabase.auth.session',
				},
			},
		)

		nuxtApp._supabaseClient = supabaseClient
	}

	return nuxtApp._supabaseClient as SupabaseClient
}
