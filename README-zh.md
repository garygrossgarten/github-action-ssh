```markdown
# GitHub Action SSH

简单的 GitHub Action，用于使用 SSH 在远程服务器上运行命令。这与最新的 [GitHub Actions](https://github.com/features/actions) 兼容。

## ✨ 示例用法

**使用 OpenSSH 加密私钥的示例**

- name: ls -a 通过 ssh
  uses: garygrossgarten/github-action-ssh@release
  with:
    command: ls -a
    host: ${{ secrets.HOST }}
    username: garygrossgarten
    passphrase: ${{ secrets.PASSPHRASE }}
    privateKey: ${{ secrets.PRIVATE_KEY}}

🔐 在这里设置您的机密: `https://github.com/USERNAME/REPO/settings/secrets`。

查看 [工作流示例](.github/workflows/ssh-example-workflow.yml)，了解 GitHub Actions 中一个简约的 yaml 工作流。

**结果**

![示例 ssh 工作流的结果](result.png)

## 选项

- **host** - _字符串_ - 服务器的主机名或 IP 地址。**默认:** `'localhost'`

- **port** - _整数_ - 服务器的端口号。**默认:** `22`

- **username** - _字符串_ - 用于认证的用户名。**默认:** (无)

- **password** - _字符串_ - 用于基于密码的用户认证的密码。**默认:** (无)

- **privateKey** - _混合类型_ - 包含用于基于密钥或基于主机的用户认证的私钥的 _Buffer_ 或 _字符串_（OpenSSH 格式）。**默认:** (无)

- **passphrase** - _字符串_ - 对于加密的私钥，用于解密的密码。**默认:** (无)

- **tryKeyboard** - _布尔值_ - 如果主要的用户认证方法失败，则尝试键盘交互式用户认证。**默认:** `false`

## 开发

---

这个东西是用 Typescript 和 [ssh2](https://github.com/mscdex/ssh2)（通过 [node-ssh](https://github.com/steelbrain/node-ssh)）构建的。 🚀
```