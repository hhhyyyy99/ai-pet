export const CUSTOM_PET_ACCEPT = 'image/png,image/webp,image/gif'
export const MAX_CUSTOM_PET_BYTES = 10 * 1024 * 1024

const allowedMimeTypes = new Set(CUSTOM_PET_ACCEPT.split(','))
const allowedExtensions = new Set(['png', 'webp', 'gif'])

interface PetAssetCandidate {
  name: string
  type: string
  size: number
}

export function validatePetAsset(asset: PetAssetCandidate): string | null {
  const extension = asset.name.split('.').at(-1)?.toLowerCase() ?? ''
  const supportedFormat = asset.type
    ? allowedMimeTypes.has(asset.type)
    : allowedExtensions.has(extension)
  if (!supportedFormat) {
    return '请选择 PNG、WebP 或 GIF 文件。'
  }
  if (asset.size <= 0) return '角色文件内容为空。'
  if (asset.size > MAX_CUSTOM_PET_BYTES) return '角色文件不能超过 10 MB。'
  return null
}
