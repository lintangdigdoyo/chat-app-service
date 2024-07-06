import { prismaClient } from "@/config/database"

export default class GroupService {
  static async create(name: string, userId: string) {
    const group = await prismaClient.group.create({
      data: {
        name,
        users: { create: [{ user_id: userId }] },
      },
    })

    return {
      group,
      message: "Group created successfully",
    }
  }
}
