export async function revalidatePathSafe(path: string) {
  const { revalidatePath } = await import('next/cache')
  revalidatePath(path)
}

export async function revalidateTagSafe(tag: string, profile: 'max' = 'max') {
  const { revalidateTag } = await import('next/cache')
  revalidateTag(tag, profile)
}
